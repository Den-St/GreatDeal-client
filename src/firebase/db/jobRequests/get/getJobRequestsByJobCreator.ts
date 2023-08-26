import { getJobById } from './../../jobs/get/getJobById';
import { jobsRequestCollection } from './../jobRequests.collection';
import { getDocs, query,where } from "firebase/firestore";
import { getUserById } from '../../users/get/getUserById';

export const getJobRequestsByJobCreator = async (jobCreator:string) => {
    try{
        const q = query(jobsRequestCollection, where('jobCreator','==',jobCreator));
        const docs = (await getDocs(q)).docs;
        console.log(docs.map(doc => doc.data()))
        const jobRequests = docs.map(doc => doc.data());
        const jobApplicantsQ = jobRequests.map(async (request) => await getUserById(request.applicant));
        const jobsQ = jobRequests.map(async (request) => await getJobById(request.job));
        const jobApplicants = await Promise.all(jobApplicantsQ);
        const jobs = await Promise.all(jobsQ);
        jobRequests.forEach((request,i) => {
            request.id = docs[i].id;
            request.applicant = jobApplicants[i];
            request.job = jobs[i];
        });

        return jobRequests;
    }catch(err){
        console.error(err);
    }
}