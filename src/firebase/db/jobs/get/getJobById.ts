import { JobT } from './../../../../types/job.type';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseInit";
import { collectionsKeys } from "../../collectionsKeys";

export const getJobById = async (id:string) => {
    try{
        const document = doc(db,collectionsKeys.jobs,id);
        const job = (await getDoc(document)).data();
        if(job) job.id = document.id;
        
        return job as JobT;
    }catch(err){
        console.error(err);
    }
}