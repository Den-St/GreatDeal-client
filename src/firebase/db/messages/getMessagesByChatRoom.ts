import { MessageT } from './../../../types/message.type';
import { getUserById } from './../users/get/getUserById';
import { getDocs } from 'firebase/firestore';
import { where } from 'firebase/firestore';
import { query } from 'firebase/firestore';
import { chatRoomsCollection } from '../chatRooms/chatRooms.collection';

export const getMessagesByChatRoom = async (chatRoomId:string) => {
    try{
        const q = query(chatRoomsCollection,where('chatRoom','==',chatRoomId));
        const docs = (await getDocs(q)).docs;

        const messages = docs.map(d => d.data());
        const sendersQ = messages.map(async (message) => await getUserById(message.sender));
        const senders = await Promise.all(sendersQ);
        messages.forEach((message,i) => {
            message.id = docs[i].id;
            message.sender = senders[i];
        });
        return messages as MessageT[];
    }catch(err){
        console.error(err);
    }
}