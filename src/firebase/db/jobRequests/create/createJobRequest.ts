import { jobsRequestCollection } from './../jobRequests.collection';
import { addDoc } from "firebase/firestore";
import { CreateJobRequestT } from "../../../../types/jobRequest.type";

export const createJobRequest = async (data:CreateJobRequestT) => {
    try{
        await addDoc(jobsRequestCollection,{...data,status:'active'});
    }catch(err){
        console.error(err);
    }
}