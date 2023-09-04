import { messageCollection } from './../get/messageCollection';
import { addDoc } from "firebase/firestore";
import { CreateMessageT } from "../../../../types/message.type";

export const createMessage = async (data:CreateMessageT) => {
    try{
        return await addDoc(messageCollection,data);
    }catch(err){
        console.error(err);
    }
}