import { useAppSelector } from './redux';
import { changeJobRequestStatus } from "../firebase/db/jobRequests/patch/changeJobRequestStatus";
import { JobRequestStatusT, JobRequestT } from "../types/jobRequest.type"

export const useRequestStatusController = (refetch:() => Promise<void>) => {
    const userId = useAppSelector(state => state.user.id);
    const onChangeRequestStatus = async (request:JobRequestT,newStatus:JobRequestStatusT) => {
        try{
            if(!userId) return;
            await changeJobRequestStatus(request,newStatus,userId);
            await refetch();
        }catch(err){
            console.error(err);
        }
    }

    return {onChangeRequestStatus}
}