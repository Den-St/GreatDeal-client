import { useCallback, useState } from "react";
import { CategoryT } from "../types/category.type";
import _debounce from 'lodash/debounce';
import { getCategoriesByName } from "../firebase/db/categories/get/getCategoriesByName";

export const useSearchCategories = () => {
    const [categories,setCategories] = useState<CategoryT[]>([]);
    const [categoriesLoading,setLoading] = useState(false);
    
    const search = async (value?: string) => {
        if(!value) {
            setCategories([]);
            return;
        }
        setLoading(true);
        try{
            const res = await getCategoriesByName(value.toLowerCase());
            setCategories(res as CategoryT[]);
        }catch(err){
            console.error(err);
        }
        setLoading(false);
    }
    
    const debounceSearchCategories = useCallback(_debounce(search, 400), []);

    return {debounceSearchCategories,categories,categoriesLoading};
}