import { depositsCollection } from './../deposit.collection';
import { addDoc } from 'firebase/firestore';
import { CreateDepositT } from '../../../../types/deposit';

export const createDeposit = async (data:CreateDepositT) => {
    return await (await addDoc(depositsCollection,data)).id;
}