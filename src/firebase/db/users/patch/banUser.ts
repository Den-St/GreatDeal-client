import { collectionsKeys } from './../../collectionsKeys';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../../firebaseInit';

export const banUser = async (userId:string) => {
    try{
        const userRef = doc(db,collectionsKeys.users,userId);
        await updateDoc(userRef,
            {
                isBanned:true
            });
    }catch(err){
        console.error(err);
    }
}