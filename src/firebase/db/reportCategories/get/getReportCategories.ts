import { getDocs } from "firebase/firestore";
import { getFilteredQuery } from "../../../../helpers/getFilteredQuery";
import { reportCategoriesCollection } from "../reportCategories.collection";

export const getReportCategories = async () => {
    try{
        const reportCategories = await getDocs(reportCategoriesCollection);
        return getFilteredQuery(reportCategories);
    }catch(err){
        console.error(err);
    }
}