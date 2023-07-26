import { getUserById } from './../../users/get/getUserById';
import { getDocs } from "firebase/firestore";
import { JobT } from "../../../../types/job.type";
import { getCategoryById } from "../../categories/get/getCategoryById";
import { jobsCollection } from "../jobs.collection";


export const getJobs = async () => {
    try{
        const jobsDocs = (await getDocs(jobsCollection)).docs;

        const jobs = jobsDocs.map(jobDoc => jobDoc.data());
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