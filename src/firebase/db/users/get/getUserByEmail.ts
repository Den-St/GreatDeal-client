import { getDocs, query, where } from "firebase/firestore";
import { getFilteredQuery } from "../../../../helpers/getFilteredQuery";
import { usersCollection } from "../users.collection";

export const getUserByEmail = async (email?:string | null) => {
    try{
        const q = query(usersCollection,where('email', "==", email));
        const docs = await getDocs(q);
        const userDoc = docs.docs[0];
        const user = userDoc.data();
        user.id = userDoc.id;
        console.log('u',user);
        return user;
    }catch(err){
        console.error(err);
    }
}