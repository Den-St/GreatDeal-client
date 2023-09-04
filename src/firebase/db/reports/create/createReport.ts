import { reportsCollection } from './../reports.collection';
import { addDoc } from 'firebase/firestore';
import { CreateReportT } from '../../../../types/report.type';

export const createReport = async (data:CreateReportT) => {
    try{
        await addDoc(reportsCollection,data);
    }catch(err){
        console.error(err);
    }
}