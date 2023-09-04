import { useEffect } from 'react';
import { changeReportStatus } from './../../firebase/db/reports/patch/changeReportStatus';
import { createReportResult } from './../../firebase/db/reportResults/create/createReportResult';
import { CreateReportResultT, ReportResulT } from './../../types/reportResult.type';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReportResultsByReportId } from '../../firebase/db/reportResults/get/getReportResultsByReportId';
import { banUser } from '../../firebase/db/users/patch/banUser';

export const useReportResults = () => {
    const reportId = useParams().id;
    const [reportResults,setReportResults] = useState<ReportResulT[]>([]);
    const [reportResultsLoading,setReportResultsLoading] = useState(false);
    const [comment,setComment] = useState('');
    const [sentence,setSentence] = useState('innocent');
    const [innocence,setInnocence] = useState('innocent');

    const fetch = async () => {
        if(!reportId) return;
        setReportResultsLoading(true);
        const res = await getReportResultsByReportId(reportId);
        setReportResultsLoading(false);
        if(!res) return;
        setReportResults(res);
    }

    const onCreateReportResult = async (data:CreateReportResultT) => {
        if(!reportId) return;
        await createReportResult(data);
        await changeReportStatus(reportId,'done');
        if(data.sentence === 'ban') await banUser(data.suspect);
        fetch();
    }

    useEffect(() => {
        fetch();
    },[reportId])

    return {onCreateReportResult,fetch,reportResults,reportResultsLoading,setComment,comment,setSentence,sentence,setInnocence,innocence};
}