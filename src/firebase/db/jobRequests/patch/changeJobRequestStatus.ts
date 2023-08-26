import { doc, updateDoc } from 'firebase/firestore';
import { JobRequestStatusT, JobRequestT } from '../../../../types/jobRequest.type';
import { db } from '../../../firebaseInit';
import { createChatRoom } from '../../chatRooms/create/createChatRoom';
import { collectionsKeys } from '../../collectionsKeys';
export const changeJobRequestStatus = async (jobReq:JobRequestT,newStatus:JobRequestStatusT,userId:string) => {
    try{
        const jobRequestRef = doc(db,collectionsKeys.jobRequests,jobReq.id);
        await updateDoc(jobRequestRef,
            {
                status:newStatus
            })
        if(newStatus === 'approved') {
            const jobRef = doc(db,collectionsKeys.jobs,jobReq.job.id);
            await updateDoc(jobRef,
                {
                    status:'in work',
                    worker:jobReq.applicant.id
                })
            await createChatRoom(jobReq.job.id,userId,jobReq.applicant.id || '');
        }
    }catch(err){
        console.error(err);
    }
}