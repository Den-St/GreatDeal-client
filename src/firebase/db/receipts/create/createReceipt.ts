import { addDoc } from 'firebase/firestore';
import { ref } from 'firebase/storage';
import { db } from '../../../firebaseInit';
import { receiptCollection } from '../receiptCollection';
import { JobT } from './../../../../types/job.type';
export const createReceipt = async (job:JobT,rate:number,review:string) => {
    try{
        await addDoc(receiptCollection,{
            job:job.id,
            jobCreator:job.creator?.id,
            rate,
            worker:job.worker?.id,
            review
        })
    }catch(err){
        console.error(err);
    }
}