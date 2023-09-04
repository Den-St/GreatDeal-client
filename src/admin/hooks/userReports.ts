import { useEffect } from 'react';
import { ReportT, SearchReportT } from './../../types/report.type';
import { useState } from 'react';
import { getUserReports } from '../../firebase/db/reports/get/getUserReports';
export const useSearchUserReports = () => {
    const [reports,setReports] = useState<ReportT[]>([]);
    const [reportsLoading,setReportsLoading] = useState(false);

    const searchReports = async (filters:SearchReportT) => {
        setReportsLoading(true);
        const res = await getUserReports(filters);
        if(!res) return;
        setReports(res);
        setReportsLoading(false);
    }

    useEffect(() => {
        searchReports({categoryIds:[],creatorId:"",suspectId:"",statuses:['not under investigation']});
    },[])

    return {searchReports,reports,reportsLoading};
}