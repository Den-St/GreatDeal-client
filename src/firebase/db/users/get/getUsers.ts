import { getDocs } from "firebase/firestore"
import { getFilteredQuery } from "../../../../helpers/getFilteredQuery";
import { usersCollection } from "../users.collection";

export const getUsers = async () => {
    try{
        const users = await getDocs(usersCollection);
        return getFilteredQuery(users);
    }catch(err){
        console.error(err);
    }
}