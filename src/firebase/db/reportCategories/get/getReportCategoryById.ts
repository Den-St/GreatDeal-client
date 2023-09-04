import { ReportCategoryT } from './../../../../types/reportCategory.type';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseInit";
import { collectionsKeys } from "../../collectionsKeys";

export const getReportCategoryById = async (id:string) => {
    try{
        const document = doc(db,collectionsKeys.reportCategories,id);
        const category = (await getDoc(document)).data();
        if(!category) return;
        category.id = document.id;
        return category as ReportCategoryT;
    }catch(err){
        console.error(err);
    }
}