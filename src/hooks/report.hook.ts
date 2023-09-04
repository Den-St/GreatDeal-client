import { useAppSelector } from './redux';
import { useEffect } from 'react';
import { ReportCategoryT } from './../types/reportCategory.type';
import { useState } from 'react';
import { getReportCategories } from '../firebase/db/reportCategories/get/getReportCategories';
import { createReport } from '../firebase/db/reports/create/createReport';
import { getReportCategoriesByType } from '../firebase/db/reportCategories/get/getReportCategoriesByType';

export const useReport = (suspect:string,job?:string,chat?:string) => {
    const [reportCategories,setReportCategories] = useState<ReportCategoryT[]>();
    const [loading,setLoading] = useState<{reportCategories:boolean}>({reportCategories:false});
    const [pickedCategory,setPickedCategory] = useState<ReportCategoryT>();
    const [comment,setComment] = useState('');
    const [success,setSuccess] = useState(false);
    const userId = useAppSelector(state => state.user.id);

    const fetch = async () => {
        setLoading(prev => ({...prev,reportCategories:true}));
        const res = await getReportCategoriesByType(job ? 'job' : 'user');
        setReportCategories(res as ReportCategoryT[]);
        setLoading(prev => ({...prev,reportCategories:false}));
    }
    const onReport = async () => {
        if(!pickedCategory || !userId || !suspect) return;

        await createReport({
            category:pickedCategory.id,
            chat:chat || '',
            comment:comment,
            createdAt:new Date(),
            creator:userId,
            status:'not under investigation',
            suspect,
            job:job || ''
        });
        setSuccess(true);
    }
    useEffect(() => {
        fetch();
    },[])
    return {onReport,loading,reportCategories,setPickedCategory,pickedCategory,setComment,comment,success};
}