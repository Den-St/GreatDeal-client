import { ChatRoomT } from './../../../../types/chatRoom.type';
import { collectionsKeys } from './../../collectionsKeys';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../../firebaseInit';

export const setLastMessage = async (messageId:string,chatRoom:ChatRoomT) => {
    try{
        const ref = doc(db,collectionsKeys.chatRooms,chatRoom.id);
        
        await setDoc(ref,{
            jobCreator:chatRoom.jobCreator.id,
            lastMessage:messageId,
            worker:chatRoom.worker.id,
            job:chatRoom.job.id
        });
    }catch(err){
        console.error(err);
    }
}