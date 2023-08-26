import { useAppSelector } from './redux';
import { useState, useEffect } from 'react';
import { JobT } from '../types/job.type';
import { getJobByWorkerId } from '../firebase/db/jobs/get/getJobByWorkerId';
export const useMyJobs = () => {
    const [jobs,setJobs] = useState<JobT[]>([]);
    const [jobsLoading,setJobsLoading] = useState<boolean>(true);
    const userId = useAppSelector(state => state.user.id);

    const fetch = async () => {
        if(!userId) return;
        try{
            const res = await getJobByWorkerId(userId);
            if(!res) return;
            setJobs(res);
            setJobsLoading(false);
        }catch(err){
            console.error(err);
        }
    }       
    useEffect(() => {
        fetch();
    },[userId])
    return {jobs,jobsLoading};
}