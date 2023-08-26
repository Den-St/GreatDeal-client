import { useAppSelector } from './redux';
import { useState, useEffect } from 'react';
import { alreadyHaveJobRequest } from '../firebase/db/jobRequests/get/alreadyHaveRequest';
import { JobT } from '../types/job.type';
import { createJobRequest } from '../firebase/db/jobRequests/create/createJobRequest';

export const useSendJobRequest = (job:JobT | null) => {
    const userId = useAppSelector(state => state.user.id);
    const [alreadyHave,setAlreadyHave] = useState(false);
    const [loadingAlreadyHave,setLoadingAlreadyHave] = useState(false);
    
    const onAlreadyHaveRequest = async (userId:string) => {
        try{
            if(!job) return;
            setLoadingAlreadyHave(true);
            const res = await alreadyHaveJobRequest(job.id,userId);
            setAlreadyHave(res);
            setLoadingAlreadyHave(false);
        }catch(err){
            console.error(err);
        }
    };
    const onSendJobRequest = async (job:JobT | null) => {
        if(!userId || !job?.creator?.id) return;
        try{
            await createJobRequest({
                applicant:userId,
                jobCreator:job.creator?.id,
                job:job.id,createdAt:new Date(),
                status:'active'
            });
            onAlreadyHaveRequest(userId);
        }catch(err){
            console.error(err);
        }
    }
    useEffect(() => {
        if(userId && job) onAlreadyHaveRequest(userId);
    },[userId,job])

    return {onSendJobRequest,alreadyHave,loadingAlreadyHave,userId};
}