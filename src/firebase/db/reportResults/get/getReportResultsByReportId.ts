import { getUserById } from './../../users/get/getUserById';
import { getDoc } from 'firebase/firestore';
import { collectionsKeys } from './../../collectionsKeys';
import { db } from './../../../firebaseInit';
import { doc } from 'firebase/firestore';
import { ReportResulT } from './../../../../types/reportResult.type';
import { getDocs } from 'firebase/firestore';
import { where } from 'firebase/firestore';
import { query } from 'firebase/firestore';
import { reportResultsCollection } from '../reportResultsCollection';

export const getReportResultsByReportId = async (reportId:string) => {
    try{
        const report = (await getDoc(doc(db,collectionsKeys.reports,reportId))).data();
        const q = query(reportResultsCollection,where('suspect',"==",report?.suspect));
        const docs = (await getDocs(q)).docs;
        const reportResults = docs.map(doc => doc.data());
        const suspectsQ = reportResults.map(async reportResult => await getUserById(reportResult.suspect));
        const suspects = await Promise.all(suspectsQ);

        reportResults.forEach((reportResult,i) => {
            reportResult.id = docs[i].id;
            reportResult.suspect = suspects[i];
        });

        return reportResults as ReportResulT[];
    }catch(err){
        console.error(err);
    }
}