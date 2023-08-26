import { collectionsKeys } from './../../collectionsKeys';
import { db } from './../../../firebaseInit';
import { JobT } from "../../../../types/job.type";
import { doc, updateDoc } from 'firebase/firestore';

export const changeJobStatus = async (job:JobT,newStatus:string) => {
    try{
        const jobRef = doc(db,collectionsKeys.jobs,job.id);
        await updateDoc(jobRef,
            {
                status:newStatus
            })
    }catch(err){

    }
}