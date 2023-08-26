import { getUserById } from './../../users/get/getUserById';
import { where, getDocs } from 'firebase/firestore';
import { query } from 'firebase/firestore';
import { ReceiptI } from '../../../../types/receipt.type';
import { receiptCollection } from '../receiptCollection';
export const getReceiptsByWorkerId = async (userId:string) => {
    try{
        const q = query(receiptCollection,where('worker','==',userId));
        const receiptsDocs = (await getDocs(q)).docs;
        const receipts = receiptsDocs.map(receipt => receipt.data());
        const jobCreatorsQ = receipts.map(async receipt => await getUserById(receipt.jobCreator));
        const jobCreators = await Promise.all(jobCreatorsQ);

        receipts.forEach((receipt,i) => {
            receipt.id = receiptsDocs[i].id;
            receipt.jobCreator = jobCreators[i];
        });
        return receipts as ReceiptI[];
    }catch(err){
        console.error(err);
    }
}