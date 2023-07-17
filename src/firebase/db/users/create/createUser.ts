import { usersCollection } from './../users.collection';
import { addDoc } from "firebase/firestore";
import { createUserI } from '../../../../types/user.type';

export const createUser = (user:createUserI) => {
    try{
        console.log(user)
        addDoc(usersCollection,{...user});
    }catch(err){
        console.error(err);
    }
}