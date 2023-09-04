import { getReportCategoriesByType } from './../../firebase/db/reportCategories/get/getReportCategoriesByType';
import { useEffect } from 'react';
import { getReportCategories } from './../../firebase/db/reportCategories/get/getReportCategories';
import { ReportCategoryT } from './../../types/reportCategory.type';
import { useState } from 'react';
export const useReportCategories = (type:string) => {
    const [categories,setCategories] = useState<ReportCategoryT[]>([]); 
    const [categoriesLoading,setLoading] = useState(false);
    const [pickedCategories,setPickedCategory] = useState<string[]>([]);

    const fetch = async () => {
        setLoading(true);
        const res = await getReportCategoriesByType(type);
        setCategories(res as ReportCategoryT[]); 
        setLoading(false);
    }

    useEffect(() => {
        fetch();
    },[]);

    return {categories,categoriesLoading,setPickedCategory,pickedCategories};
}