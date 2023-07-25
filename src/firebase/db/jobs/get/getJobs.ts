import { getDocs } from "firebase/firestore";
import { getCategoryById } from "../../categories/get/getCategoryById";
import { getUserById } from "../../users/get/getUserById";
import { jobsCollection } from "../jobs.collection";


export const getJobs = async () => {
    try{
        const jobsDocs = (await getDocs(jobsCollection)).docs;
        const jobs = jobsDocs.map(jobDoc => jobDoc.data());
        jobs.forEach(async (job,i) => {
            console.log('ll',job)
            job.creator = await getUserById(job.creator);
            job.category = await getCategoryById(job.category);
            job.id = jobsDocs[i].id;
        });
        return jobs;
    }catch(err){
        console.error(err);
    }
}