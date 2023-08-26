import { ref, getDownloadURL } from 'firebase/storage';
import { getCategoryById } from './../../categories/get/getCategoryById';
import { JobT } from './../../../../types/job.type';
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../../firebaseInit";
import { collectionsKeys } from "../../collectionsKeys";
import { getUserById } from '../../users/get/getUserById';

export const getJobById = async (id:string) => {
    try{
        const document = doc(db,collectionsKeys.jobs,id);
        const job = (await getDoc(document)).data();
        if(!job) return;
        job.id = document.id;
        job.creator = await getUserById(job.creator);
        if(job.worker) job.worker = await getUserById(job.worker);
        job.category = await getCategoryById(job.category);
        if(job.images){
            const imagesQ = job?.images.map(async (image: any) => await getDownloadURL(ref(storage,image)))
            const images = await Promise.all(imagesQ);
            job.images = images;
        }
       
        return job as JobT;
    }catch(err){
        console.error(err);
    }
}