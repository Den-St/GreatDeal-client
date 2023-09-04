import { messageCollection } from './messageCollection';
import { MessageT } from '../../../../types/message.type';
import { getUserById } from '../../users/get/getUserById';
import { getDocs } from 'firebase/firestore';
import { where } from 'firebase/firestore';
import { query } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../../firebaseInit';

export const getMessagesByChatRoom = async (chatRoomId:string) => {
    try{
        const q = query(messageCollection,where('chatRoom','==',chatRoomId));
        const docs = (await getDocs(q)).docs; 
        console.log('bb',chatRoomId);

        const messages = docs.map(d => d.data());
        const sendersQ = messages.map(async (message) => await getUserById(message.sender));
        const senders = await Promise.all(sendersQ);
        const imagesArraysQ = messages.map((message) => message.images && message.images.map(async (image: string | undefined) => await getDownloadURL(ref(storage,image))));
        const imagesQ = imagesArraysQ.map(async arr => arr && await Promise.all(arr));
        const images = await Promise.all(imagesQ);
        
        messages.forEach((message,i) => {
            message.id = docs[i].id;
            message.sender = senders[i];
            message.images = images[i];
        });
        return messages as MessageT[];
    }catch(err){
        console.error(err);
    }
}