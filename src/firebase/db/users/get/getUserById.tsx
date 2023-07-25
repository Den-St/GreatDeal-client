import { doc, getDoc } from "firebase/firestore"
import { db } from "../../../firebaseInit";
import { collectionsKeys } from "../../collectionsKeys";

export const getUserById = async (id:string) => {
    try{
        const document = await doc(db,collectionsKeys.users,id);
        const user = (await getDoc(document)).data();
        return user;
    }catch(err){
        console.error(err);
    }
    
}