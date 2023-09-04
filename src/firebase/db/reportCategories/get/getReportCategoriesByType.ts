import { getDocs, query, where } from "firebase/firestore";
import { reportCategoriesCollection } from "../reportCategories.collection";

export const getReportCategoriesByType = async (type:string) => {
    try{
        const q = query(reportCategoriesCollection,where('type','==',type));
        const docs = (await getDocs(q)).docs;
        const categories = docs.map(doc => doc.data());
        categories.forEach((category,i) => {
            category.id = docs[i].id
        });
        return categories;
    }catch(err){
        console.error(err);
    }
}