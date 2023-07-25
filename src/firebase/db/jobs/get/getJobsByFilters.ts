import { jobsCollection } from './../jobs.collection';
import { getDocs, query, where } from "firebase/firestore";
import { JobT, SearchJobT } from "../../../../types/job.type";
import { getUserById } from '../../users/get/getUserById';
import { getCategoryById } from '../../categories/get/getCategoryById';

export const getJobsByFilters = async (filters:SearchJobT) => {
    try{
        console.log('cat',filters)
        const q = filters.category ? query(jobsCollection,
        where('title',">=",filters.title || ''),   
        where('title','<=',(filters.title || '') + "\uf8ff"),
        where('category','==',filters.category?.id || null))
        : query(jobsCollection,
          where('title',">=",filters.title || ''),   
          where('title','<=',(filters.title || '') + "\uf8ff"));

        // query(jobsCollection,where('category','==',category));
            // : query(jobsCollection,where('title',">=",filters.title),
            // where('title','<=',filters.title + "\uf8ff"));


            // filters.category 
            // ?   query(jobsCollection,where('title',">=",filters.title || null),
            // where('title','<=',(filters.title || '') + "\uf8ff"),where('reward','>=',filters.rewardMin),
            // where('category','==',category))
            // :  
        const docs = (await getDocs(q)).docs;
        const jobsDocs = docs.map(jobDoc => {
            if(+jobDoc.data().reward > (filters.rewardMin || 0)){
                return jobDoc.data();
            }
        });
        jobsDocs.forEach(async (job,i) => {
            if(job){
                job.id = docs[i].id;
                await Promise.all([
                    job.creator = await getUserById(job.creator),
                    job.category = await getCategoryById(job.category)
                ]);
            }
        });

        return jobsDocs;
    }catch(err){
        console.error(err);
    }
}