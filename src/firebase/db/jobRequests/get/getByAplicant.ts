import { getJobById } from './../../jobs/get/getJobById';
import { getUserById } from './../../users/get/getUserById';
import { getDocs, query, where } from 'firebase/firestore';
import { jobsRequestCollection } from '../jobRequests.collection';
export const getJobRequestsByAplicant = async (aplicantId:string) => {
    try{
        const q = query(jobsRequestCollection, where('applicant','==',aplicantId));
        const docs = (await getDocs(q)).docs;
        const jobRequests = docs.map(doc => doc.data());
        const jobCreatorsQ = jobRequests.map(async (request) => await getUserById(request.jobCreator));
        const jobCreators = await Promise.all(jobCreatorsQ);
        const jobsQ = jobRequests.map(async (request) => await getJobById(request.job));
        const jobs = await Promise.all(jobsQ);

        jobRequests.forEach((request,i) => {
            request.id = docs[i].id;
            request.jobCreator = jobCreators[i];
            request.job = jobs[i];
        });

        return jobRequests;
    }catch(err){

    }
}