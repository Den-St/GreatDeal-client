import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseInit";
import { collectionsKeys } from "../../collectionsKeys";

export const changeReportStatus = async (id:string,status:string) => {
    try{
        const reportRef = doc(db,collectionsKeys.reports,id);
        await updateDoc(reportRef,
            {
                status
            })
    }catch(err){
        console.error(err);
    }
}