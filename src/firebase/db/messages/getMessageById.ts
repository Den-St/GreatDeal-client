import { getUserById } from './../users/get/getUserById';
import { doc, getDoc } from "firebase/firestore";
import { MessageT } from "../../../types/message.type";
import { db } from "../../firebaseInit";
import { collectionsKeys } from "../collectionsKeys";

export const getMessageById = async (messageId:string) => {
    if(!messageId) return;
    try{
        const document = doc(db,collectionsKeys.messages,messageId);
        const message = (await getDoc(document)).data();
        if(!message) return;
        message.id = document.id;
        message.sender = await getUserById(message.sender);
         
        return message as MessageT;
    }catch(err){
        console.error(err);
    }
}