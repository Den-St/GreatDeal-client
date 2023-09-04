import { useAppSelector } from './redux';
import { createMessage } from './../firebase/db/messages/create/create';
import { MessageT, CreateMessageFormT } from './../types/message.type';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChatRoomById } from "../firebase/db/chatRooms/get/getChatRoomById";
import { ChatRoomT } from "../types/chatRoom.type";
import { query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { getUserById } from '../firebase/db/users/get/getUserById';
import { setLastMessage } from '../firebase/db/chatRooms/patch/setLastMessage';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase/firebaseInit';
import {v4} from 'uuid';
import { messageCollection } from '../firebase/db/messages/get/messageCollection';

export const useChatRoom = (clearInputs:() => void) => {
    const chatRoomId = useParams().id;
    const [chatRoom,setChatRoom] = useState<ChatRoomT | null>(null);
    const [chatRoomLoading,setChatRoomLoading] = useState(true);
    const [messages,setMessages] = useState<MessageT[]>();
    const [messagesLoading,setMessagesLoading] = useState(true);
    const userId = useAppSelector(state => state.user.id);
    
    const fetchChatRoom = async () => {
        if(!chatRoomId) return;
        const res = await getChatRoomById(chatRoomId);
        if(!res) return;
        setChatRoom(res);
        setChatRoomLoading(false);
    }

    const uploadImages = async (files:File[]) => {
        // const imagesRef = Object.keys(files).map(file => ref(storage, `messageImage/${files[+file].name + v4()}`));
        // const uploadQ = imagesRef.map(async (ref,i) => await uploadBytes(ref,files[i]));
        // return await Promise.all(uploadQ);
        const imagesRef = files.map(file => ref(storage, `messageImage/${file.name + v4()}`));
        const uploadQ = imagesRef.map(async (ref,i) => await uploadBytes(ref,files[i]));
        return await Promise.all(uploadQ);
        // const imageRef = ref(storage, `messageImage/${file.name + v4()}`);
        // return await uploadBytes(imageRef,file);
    }

    const onCreateMessage = async (data:CreateMessageFormT) => {
        if(!userId || !chatRoomId || !data.text) return;
        const images = data?.images ? await uploadImages(data.images) : null;
        const newMessage = await createMessage({
            text:data.text,
            sender:userId,
            chatRoom:chatRoomId,
            createdAt:new Date(),
            images:images?.map(image => image.metadata.fullPath) || []
        });
        if(!newMessage?.id || !chatRoom) return;
        clearInputs();
        await setLastMessage(newMessage.id,chatRoom);
    }

    useEffect(() => {
        fetchChatRoom();

        //fetchMessages
        if(!chatRoomId) return;
        setMessagesLoading(true);
        const q = query(messageCollection,where('chatRoom','==',chatRoomId),orderBy('createdAt','asc'));
        const unsubscribe = onSnapshot(q,async (snapshot) => {
            const docs = snapshot.docs;

            const _messages = docs.map(d => d.data());
            console.log('hfdghdfgh',docs.map(d => d.data()))
            const sendersQ = _messages.map(async (message) => await getUserById(message.sender));
            const senders = await Promise.all(sendersQ);
            const imagesArraysQ = _messages.map((message) => message.images && message.images.map(async (image: string | undefined) => await getDownloadURL(ref(storage,image))));
            const imagesQ = imagesArraysQ.map(async arr => arr && await Promise.all(arr));
            const images = await Promise.all(imagesQ);
            
            _messages.forEach((message,i) => {
                message.id = docs[i].id;
                message.sender = senders[i];
                message.images = images[i];
            });
            setMessages(_messages as MessageT[]);
        });
        setMessagesLoading(false);
        return () => unsubscribe();
    },[chatRoomId])
    return {chatRoom,chatRoomLoading,messages,messagesLoading,onCreateMessage,userId}
}