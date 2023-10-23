import { usersCollection } from './../users.collection';
import { addDoc } from "firebase/firestore";
import { createUserI } from '../../../../types/user.type';

export const createUser = async (user:createUserI) => {
    try{
        await addDoc(usersCollection,{...user,balance:0,isBanned:false});
    }catch(err){
        console.error(err);
    }
}