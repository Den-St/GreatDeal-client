import { getDocs } from "firebase/firestore";
import { getFilteredQuery } from "../../../../helpers/getFilteredQuery";
import { JobT } from "../../../../types/job.type";
import { jobsCollection } from "../jobs.collection";

export const getJobs = async () => {
    try{
        const jobs = await getDocs(jobsCollection);
        return getFilteredQuery(jobs) as JobT[];
    }catch(err){
        console.error(err);
    }
}