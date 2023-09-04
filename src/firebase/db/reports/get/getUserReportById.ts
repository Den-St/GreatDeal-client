import { getReportCategoryById } from './../../reportCategories/get/getReportCategoryById';
import { ReportT } from './../../../../types/report.type';
import { getChatRoomById } from './../../chatRooms/get/getChatRoomById';
import { getUserById } from './../../users/get/getUserById';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseInit";
import { collectionsKeys } from "../../collectionsKeys";

export const getUserReportById = async (id:string) => {
    try{
        const document = doc(db,collectionsKeys.reports,id);
        const report = (await getDoc(document)).data();
        if(!report) return;
        report.id = document.id;
        report.creator = await getUserById(report.creator);
        report.category = await getReportCategoryById(report.category);
        report.suspect = await getUserById(report.suspect);

        return report as ReportT;
    }catch(err){
        console.error(err);
    }
}