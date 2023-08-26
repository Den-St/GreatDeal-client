import { getDocs } from 'firebase/firestore';
import { query, where } from 'firebase/firestore';
import { jobsRequestCollection } from '../jobRequests.collection';

export const alreadyHaveJobRequest = async (jobId:string,aplicantId:string) => {
    const q = query(jobsRequestCollection,
        where('job',"==",jobId),
        where('applicant',"==",aplicantId));
    
    const doc = await getDocs(q);
    if(!doc.docs.length) return false;
    return true;
}