import { getDocs } from 'firebase/firestore';
import { getFilteredQuery } from '../../../../helpers/getFilteredQuery';
import { categoriesCollection } from '../categories.collection';
export const getAllCategories = async () => {
    try{
        const categoriesDocs = await getDocs(categoriesCollection);

        return getFilteredQuery(categoriesDocs);
    }catch(err){
        console.error(err);
    }
}
