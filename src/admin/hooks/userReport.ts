import { getMessagesByChatRoom } from './../../firebase/db/messages/get/getMessagesByChatRoom';
import { useEffect } from 'react';
import { ReportT } from './../../types/report.type';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserReportById } from '../../firebase/db/reports/get/getUserReportById';
import { MessageT } from '../../types/message.type';
import { changeReportStatus } from '../../firebase/db/reports/patch/changeReportStatus';
export const useUserReport = () => {
    const id = useParams().id;
    const [report,setReport] = useState<ReportT>();
    const [loading,setLoading] = useState<{report:boolean,messages:boolean}>({report:false,messages:false});
    const [messages,setMessages] = useState<MessageT[]>([]);

    const fetch = async () => {
        if(!id) return;
        setLoading({report:true,messages:false});
        const res = await getUserReportById(id);
        if(!res?.chat) return;

        setReport(res);
        setLoading({report:false,messages:true});
        getMessagesByChatRoom(res.chat).then(res => {
            setMessages(res || []);
        });

        setLoading({report:false,messages:false});
    }
    const onChangeReportStatus = async (status:string) => {
        if(!id) return;
        setReport(prev => {if(prev) return ({...prev,status})});
        await changeReportStatus(id,status);
    }   

    useEffect(() => {
        fetch();
    },[id]);

    return {loading,report,messages,onChangeReportStatus};
}