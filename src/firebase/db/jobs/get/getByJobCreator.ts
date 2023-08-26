import { jobsCollection } from './../jobs.collection';
import { getDocs, query, where } from "firebase/firestore";
import { getCategoryById } from '../../categories/get/getCategoryById';

export const getJobsByJobCreator = async (jobCreator:string) => {
    try{
        const q = query(jobsCollection,
            where("creator","==",jobCreator));
        const docs = (await getDocs(q)).docs;
        const jobs = docs.map(jobDoc =>  jobDoc.data());
        
        const categoriesQ = jobs.map(async (job) => job && await getCategoryById(job.category));
        const categories = await Promise.all(categoriesQ);
        jobs.forEach(async (job,i) => {
            if(job){
                job.id = docs[i].id;
                job.category = categories[i];
            }
        });

        return jobs;
    }catch(err){
        console.error(err);
    }
}