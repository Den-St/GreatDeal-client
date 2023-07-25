import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseInit";
import { collectionsKeys } from "../../collectionsKeys";

export const getCategoryById = async (id:string) => {
    try{
        const document = doc(db,collectionsKeys.categories,id);
        const category = (await getDoc(document)).data();
        if(category) category.id = document.id;
        
        return category
    }catch(err){
        console.error(err);
    }
}