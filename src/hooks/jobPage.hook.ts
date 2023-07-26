import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { JobT } from './../types/job.type';
import { useState } from 'react';
import { getJobById } from '../firebase/db/jobs/get/getJobById';

export const useJobPage = () => {
    const [job,setJob] = useState<JobT | null>(null);
    const [jobLoading,setJobLoading] = useState<boolean>(false);
    const jobId = useParams().id;

    const fetchJob = async () => {
        if(!jobId) return;
        try{
            setJobLoading(true);
            const res = await getJobById(jobId);
            if(!res) return; 

            setJob(res);
            setJobLoading(false);
        }catch(err){
            console.error(err);
        }
    }
    useEffect(() => {
        fetchJob();
    },[])

    return {job,jobLoading};
}

