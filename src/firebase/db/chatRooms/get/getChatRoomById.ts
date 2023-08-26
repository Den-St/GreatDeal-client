import { getMessageById } from './../../messages/getMessageById';
import { getJobById } from './../../jobs/get/getJobById';
import { getUserById } from './../../users/get/getUserById';
import { doc, getDoc } from "firebase/firestore";
import { ChatRoomT } from "../../../../types/chatRoom.type";
import { db } from "../../../firebaseInit";
import { collectionsKeys } from "../../collectionsKeys";

export const getChatRoomById = async (id:string) => {
    try{
        const document = doc(db,collectionsKeys.chatRooms,id);
        const chatRoom = (await getDoc(document)).data();
        if(!chatRoom) return;
        chatRoom.id = document.id;
        chatRoom.jobCreator = await getUserById(chatRoom.jobCreator);
        chatRoom.worker = await getUserById(chatRoom.worker);
        chatRoom.job = await getJobById(chatRoom.job);
        chatRoom.lastMessage = await getMessageById(chatRoom.lastMessage);

        return chatRoom as ChatRoomT;
    }catch(err){
        console.error(err);
    }
}