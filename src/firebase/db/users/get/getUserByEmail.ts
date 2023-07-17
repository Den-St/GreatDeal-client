import { getDocs, query, where } from "firebase/firestore";
import { getFilteredQuery } from "../../../../helpers/getFilteredQuery";
import { usersCollection } from "../users.collection";

export const getUserByEmail = async (email?:string | null) => {
    try{
        const q = await query(usersCollection,where('email', "==", email));
        const docs = await getDocs(q);
        return getFilteredQuery(docs)[0];
    }catch(err){
        console.error(err);
    }
}