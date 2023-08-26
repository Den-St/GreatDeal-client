import { getDownloadURL, ref } from 'firebase/storage';
import { useAppSelector } from './redux';
import { getJobRequestsByJobCreator } from '../firebase/db/jobRequests/get/getJobRequestsByJobCreator';
import { getJobsByJobCreator } from '../firebase/db/jobs/get/getByJobCreator';
import { useEffect } from 'react';
import { useState } from 'react';
import { getJobRequestsByAplicant } from '../firebase/db/jobRequests/get/getByAplicant';
import { JobRequestT } from '../types/jobRequest.type';
import { JobT } from '../types/job.type';
import { storage } from '../firebase/firebaseInit';
import { getReceiptsByWorkerId } from '../firebase/db/receipts/get/getByWorkerId';
import { UserI } from '../types/user.type';

export const useMyProfile = () => {
    const user = useAppSelector(state => state.user);
    const [loading,setLoading] = useState({
        userLoading:true,
        applicantJobRequestsLoading:true,
        creatorJobRequestsLoading:true,
        jobsLoading:true,
        stats:true
    })
    const [applicantJobRequests,setApplicantJobRequests] = useState<JobRequestT[]>([]);
    const [creatorJobRequests,setCreatorJobRequests] = useState<JobRequestT[]>([]);
    const [jobs,setJobs] = useState<JobT[]>([]);
    const [dir,setDir] = useState(0);
    const [reviews,setReviews] = useState<{review:string,creator:UserI,rate:number,id:string}[]>([]);
    const [stats,setStats] = useState<{rating:number,numberOfJobs:number}>();
    
    const fetchCreatedJobs = async () => {
        if(!user.id) return;
        const res = await getJobsByJobCreator(user.id) as JobT[];
        setJobs(res);
        setLoading(prev => ({...prev,jobsLoading:false}));
    }
    const fetchYourJobRequestsByAplicant = async () => {
        if(!user.id) return;
        const res = await getJobRequestsByAplicant(user.id) as JobRequestT[];
        setApplicantJobRequests(res);
        setLoading(prev => ({...prev,applicantJobRequestsLoading:false}));
    }

    const fetchYourJobRequestsByCreator = async () => {
        if(!user.id) return;
        const res = await getJobRequestsByJobCreator(user.id) as JobRequestT[];
        setCreatorJobRequests(res);
        setLoading(prev => ({...prev,creatorJobRequestsLoading:false}));
    }
    const fetchStatsAndReviews = async () => {
        if(!user.id) return;
        setLoading(prev => ({...prev,stats:true}));
        const receipts = await getReceiptsByWorkerId(user.id);

        if(!receipts) {
            setLoading(prev => ({...prev,stats:false}));
            return;
        }
        setReviews(receipts.map((receipt) => {return {review:receipt.review,creator:receipt.jobCreator,rate:receipt.rate,id:receipt.id}}));
        setStats({rating:+(receipts.reduce((acc,cur) => acc + cur.rate,0) / receipts.length).toFixed(1)
                  ,numberOfJobs:receipts.length});
        setLoading(prev => ({...prev,stats:false}));
    }
   
    const directoriesFetch = [
        fetchStatsAndReviews,
        fetchCreatedJobs,
        fetchYourJobRequestsByAplicant,
        fetchYourJobRequestsByCreator,
    ];

    useEffect(() => {
        if(!user.id) return;
        directoriesFetch[dir]();
    },[user.id,dir]);

    useEffect(() => {
        if(!user.id) return;
        setLoading(prev => ({...prev,userLoading:false}));
    },[user.id]);

    return {user,jobs,applicantJobRequests,creatorJobRequests,setDir,dir,fetchCreatedJobs,loading,
            fetchYourJobRequestsByAplicant,fetchYourJobRequestsByCreator,stats,reviews};
}