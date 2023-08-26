import { getUserById } from './../../users/get/getUserById';
import { getDocs } from 'firebase/firestore';
import { where } from 'firebase/firestore';
import { jobsRequestCollection } from './../jobRequests.collection';
import { query } from 'firebase/firestore';

export const getByJobCreator = async (jobCreator:string) => {
    try{
        const q = query(jobsRequestCollection,where('jobCreator','==',jobCreator));
        const docs = (await getDocs(q)).docs;
        const jobRequests = docs.map(doc => doc.data());
        const applicantsQ = jobRequests.map(async (req) => await getUserById(req.applicant));
        const applicants = await Promise.all(applicantsQ);

        jobRequests.forEach((req,i) => {
            req.id = docs[i].id;
            req.applicant = applicants[i];
        });

        return jobRequests;
    }catch(err){
        console.error(err);
    }
}