import { addDoc } from "firebase/firestore";
import { CreateJobT } from "../../../../types/job.type";
import { jobsCollection } from "../jobs.collection";

export const createJob = async (data:CreateJobT) => {
    try{
        await addDoc(jobsCollection,{...data,creator:data.creator.id,category:data.category.id,createdAt:new Date()});
    }catch(err){
        console.error(err);
    }
}