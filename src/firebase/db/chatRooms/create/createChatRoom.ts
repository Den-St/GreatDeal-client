import { addDoc } from "firebase/firestore";
import { chatRoomsCollection } from "../chatRooms.collection";

export const createChatRoom = async (job:string,jobCreator:string,worker:string) => {
    try{
        await addDoc(chatRoomsCollection,{job,jobCreator,worker,lastMessage:null})
    }catch(err){
        console.error(err);
    }
}   