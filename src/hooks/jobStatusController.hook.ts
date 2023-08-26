import { changeJobStatus } from './../firebase/db/jobs/patch/changeJobStatus';
import { JobStatusT, JobT } from "../types/job.type"

export const useJobStatusController = (refetch:() => Promise<void>) => {
    const onChangeJobStatus = async (job:JobT,newStatus:JobStatusT) => {
        try{
            await changeJobStatus(job,newStatus);
            job.status = newStatus;
            await refetch();
        }catch(err){
            console.error(err)
        }
    }

    return {onChangeJobStatus};
}