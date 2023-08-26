import { collectionsKeys } from './../../collectionsKeys';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebaseInit";

export const deleteJobRequestById = async (id:string) => {
    try{
        await deleteDoc(doc(db,collectionsKeys.jobRequests,id));
    }catch(err){
        console.error(err);
    }
}