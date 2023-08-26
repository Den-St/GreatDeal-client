import { addDoc } from "firebase/firestore";
import { CreateMessageT } from "../../../../types/message.type";
import { messageCollection } from "../messageCollection";

export const createMessage = async (data:CreateMessageT) => {
    try{
        return await addDoc(messageCollection,data);
    }catch(err){
        console.error(err);
    }
}