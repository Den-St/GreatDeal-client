import { LocationT } from './../../../../types/location.type';
import { jobsCollection } from './../jobs.collection';
import { getDocs, query, where } from "firebase/firestore";
import { SearchJobT } from "../../../../types/job.type";
import { getUserById } from '../../users/get/getUserById';
import { getCategoryById } from '../../categories/get/getCategoryById';

export const getJobsByFilters = async (filters:SearchJobT,userLocation:LocationT) => {
    try{
        const q = filters.category ? query(jobsCollection,
        where('title',">=",filters.title || ''),   
        where('title','<=',(filters.title || '') + "\uf8ff"),
        where('category','==',filters.category?.id || null))
        : query(jobsCollection,
          where('title',">=",filters.title || ''),   
          where('title','<=',(filters.title || '') + "\uf8ff"));

        const docs = (await getDocs(q)).docs;
        const filteredJobsDocs = filters.isNearJob ? docs.map(jobDoc => {
            if(+jobDoc.data().reward > (filters.rewardMin || 0) 
               && jobDoc.data().status !== 'done'
               && jobDoc.data()?.location._lat >= userLocation?._lat - 0.018
               && jobDoc.data()?.location._lat <= userLocation?._lat + 0.018
               && jobDoc.data()?.location._long >= userLocation?._long - 0.019
               && jobDoc.data()?.location._long <= userLocation?._long + 0.019){
                return jobDoc;
            }
        }).filter(doc => doc) 

        : docs.map(jobDoc => {
            if(+jobDoc.data().reward > (filters.rewardMin || 0)
                && jobDoc.data().status !== 'done'){
                return jobDoc;
            }
        }).filter(doc => doc) ;

        const jobs = filteredJobsDocs.map(jobDoc => jobDoc?.data());
        
        const creatorsQ = jobs.map(async (job) => job && await getUserById(job.creator));
        const categoriesQ = jobs.map(async (job) => job && await getCategoryById(job.category));
        const creators = await Promise.all(creatorsQ);
        const categories = await Promise.all(categoriesQ);
        jobs.forEach(async (job,i) => {
            if(job && filteredJobsDocs[i]){
                job.id = filteredJobsDocs[i]?.id;
                job.creator = creators[i];
                job.category = categories[i];
            }
        });

        return jobs;
    }catch(err){
        console.error(err);
    }
}