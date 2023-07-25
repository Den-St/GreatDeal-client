import { collectionsKeys } from './../../collectionsKeys';
import { addDoc, doc } from "firebase/firestore";
import { CreateJobT } from "../../../../types/job.type";
import { jobsCollection } from "../jobs.collection";
import { db } from '../../../firebaseInit';

export const createJob = async (data:CreateJobT) => {
    try{
        const creatorRef = doc(db,collectionsKeys.users+'/'+data.creator.id);
        console.log(data);
        const categoryRef = doc(db,collectionsKeys.categories+'/'+data.category.id);
        await addDoc(jobsCollection,{...data,creator:creatorRef,category:categoryRef});
    }catch(err){
        console.error(err);
    }
}