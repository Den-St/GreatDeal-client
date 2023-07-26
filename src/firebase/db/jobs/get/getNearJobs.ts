import { LatLng, LatLngBounds } from 'leaflet';
import { jobsCollection } from './../jobs.collection';
import { getDocs, query, where } from "firebase/firestore";
import { getUserById } from '../../users/get/getUserById';
import { getCategoryById } from '../../categories/get/getCategoryById';

export const getNearJobs = async (mapBounds:LatLngBounds) => {
    try{
        const q = query(jobsCollection,
            where('location._lat',">=",mapBounds.getSouth()),
            where('location._lat',"<=",mapBounds.getNorth()),
        );
 
        const docs = (await getDocs(q)).docs;
        const jobs = docs.map(jobDoc => {
            if(jobDoc.data()?.location._long >= mapBounds.getWest() 
               && jobDoc.data()?.location._long <= mapBounds.getEast()){
                return jobDoc.data();
            }
        }).filter(job => job);
       
        const creatorsQ = jobs.map(async (job) => job && await getUserById(job.creator));
        const categoriesQ = jobs.map(async (job) => job && await getCategoryById(job.category));
        const creators = await Promise.all(creatorsQ);
        const categories = await Promise.all(categoriesQ);
        jobs.forEach(async (job,i) => {
            if(job){
                job.id = docs[i].id;
                job.creator = creators[i];
                job.category = categories[i];
            }
        });

        return jobs;
    }catch(err){
        console.error(err);
    }
}