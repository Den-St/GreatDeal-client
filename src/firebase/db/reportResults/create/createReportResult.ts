import { addDoc } from 'firebase/firestore';
import { CreateReportResultT } from "../../../../types/reportResult.type";
import { reportResultsCollection } from '../reportResultsCollection';

export const createReportResult = async (data:CreateReportResultT) => {
    try{
        await addDoc(reportResultsCollection,data);
    }catch(err){
        console.error(err);
    }
}