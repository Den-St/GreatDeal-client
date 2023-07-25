import { getDocs, query, where } from "firebase/firestore";
import { getFilteredQuery } from "../../../../helpers/getFilteredQuery";
import { categoriesCollection } from "../categories.collection";

export const getCategoriesByName = async (name:string) => {
    try{
        const q = query(categoriesCollection,where('name',">=",name),where('name','<=',name + "\uf8ff"));
        const docs = await getDocs(q);
        return getFilteredQuery(docs);
    }catch(err){
        console.error(err);
    }
}