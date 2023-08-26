import { UserI } from './../types/user.type';
import { JobT } from './../types/job.type';
import { useState } from 'react';
import { changeJobStatus } from '../firebase/db/jobs/patch/changeJobStatus';
import { createReceipt } from '../firebase/db/receipts/create/createReceipt';
import { payReward } from '../firebase/db/users/patch/payReward';
export const useDoneJob = () => {
    const [isOnDoneJob,setIsOnDoneJob] = useState(false);
    const [rate,setRate] = useState(5);
    const [isWorkFinished,setIsWorkFinished] = useState(false);
    const [review,setReview] = useState('');

    const onDoneJob = () => {
        setIsOnDoneJob(true);
    }
    const leaveDoneJob = () => {
        setIsOnDoneJob(false);
    }
    const confirmDoneJob = async (job?:JobT,worker?:UserI) => {
        if(!job || !worker) return;
        await changeJobStatus(job,'done');
        await createReceipt(job,rate,review);
        await payReward(worker,job.reward);

        setIsWorkFinished(true);
    }

    return {onDoneJob,isOnDoneJob,confirmDoneJob,rate,setRate,leaveDoneJob,isWorkFinished,review,setReview}
}