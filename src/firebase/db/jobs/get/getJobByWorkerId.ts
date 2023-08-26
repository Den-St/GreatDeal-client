import { getCategoryById } from './../../categories/get/getCategoryById';
import { getDocs, query, where } from 'firebase/firestore';
import { jobsCollection } from '../jobs.collection';
import { getUserById } from '../../users/get/getUserById';
import { JobT } from '../../../../types/job.type';
export const getJobByWorkerId = async (userId:string) => {
    try{
        const q = query(jobsCollection,
            where('worker',"==",userId));
        
        const jobsDocs = (await getDocs(q)).docs;
        const jobs = jobsDocs.map(doc => doc.data());
        const creatorsQ = jobs.map(async (job) => await getUserById(job.creator));
        const categoriesQ = jobs.map(async (job) => await getCategoryById(job.category));
        const creators = await Promise.all(creatorsQ);
        const categories = await Promise.all(categoriesQ);
        jobs.forEach(async (job,i) => {
            job.id = jobsDocs[i].id;
            job.creator = creators[i];
            job.category = categories[i];
        });
        return jobs as JobT[];

    }catch(err){
        console.error(err);
    }
}