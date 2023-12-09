import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseInit";
import { collectionsKeys } from "../../collectionsKeys";

export const activatePayment = async (depositId:string,userId:string) => {
    const depositDoc = doc(db,collectionsKeys.deposits,depositId);
    const userDoc = doc(db,collectionsKeys.users,userId);

    const [deposit,user] = await Promise.all([(await getDoc(depositDoc)).data(),(await getDoc(userDoc)).data()]);
    if(deposit?.status !== 'pending') return;

    await Promise.all([await setDoc(depositDoc,{...deposit,status:'success'}),
    await setDoc(userDoc,{...user,balance:user?.balance + deposit.amount})]);

    return deposit.amount;
}