import { getDocs, where } from 'firebase/firestore';
import { query } from 'firebase/firestore';
import { getReportCategoryById } from '../../reportCategories/get/getReportCategoryById';
import { getUserById } from '../../users/get/getUserById';
import { reportsCollection } from '../reports.collection';
import { ReportT, SearchReportT } from '../../../../types/report.type';

export const getUserReports = async (filters:SearchReportT) => {
    try{
        const q =  filters.categoryIds.length 
            ? filters.statuses.length ? query(reportsCollection,
                // where('creator',">=",filters.creatorId || ''),   
                // where('creator','<=',(filters.creatorId || '') + "\uf8ff"),
                where('suspect',">=",filters.suspectId || ''),   
                where('suspect','<=',(filters.suspectId || '') + "\uf8ff"),
                where('category','in',filters.categoryIds),
                where('status','in',filters.statuses),)
                :   query(reportsCollection,
                    // where('creator',">=",filters.creatorId || ''),   
                    // where('creator','<=',(filters.creatorId || '') + "\uf8ff"),
                    where('suspect',">=",filters.suspectId || ''),   
                    where('suspect','<=',(filters.suspectId || '') + "\uf8ff"),
                    where('category','in',filters.categoryIds),)
            : filters.statuses.length ? query(reportsCollection,
                // where('creator',">=",filters.creatorId || ''),   
                // where('creator','<=',(filters.creatorId || '') + "\uf8ff"),
                where('suspect',">=",filters.suspectId || ''),   
                where('suspect','<=',(filters.suspectId || '') + "\uf8ff"),
                where('status','in',filters.statuses),)
                :   query(reportsCollection,
                    // where('creator',">=",filters.creatorId || ''),   
                    // where('creator','<=',(filters.creatorId || '') + "\uf8ff"),
                    where('suspect',">=",filters.suspectId || ''),   
                    where('suspect','<=',(filters.suspectId || '') + "\uf8ff"),);
    
            const docs = (await getDocs(q)).docs;
            const filteredDocs = docs.map(doc => {
                if(doc.data().creator.includes(filters.creatorId)) return doc;
            }).filter(doc => doc);
            const reports = filteredDocs.map(doc => doc?.data()); 
            
            const creatorsQ = reports.map(async (report) => report && await getUserById(report.creator));
            const suspectsQ = reports.map(async (report) => report && await getUserById(report.suspect));
            const categoriesQ = reports.map(async (report) => report && await getReportCategoryById(report.category));
            const creators = await Promise.all(creatorsQ);
            const suspects = await Promise.all(suspectsQ);
            const categories = await Promise.all(categoriesQ);

            reports.forEach(async (report,i) => {
                if(report){
                    report.id = filteredDocs[i]?.id;
                    report.creator = creators[i];
                    report.suspect = suspects[i];
                    report.category = categories[i];
                }
            });
    
            return reports as ReportT[];
    }catch(err){
        console.error(err);
    }
}