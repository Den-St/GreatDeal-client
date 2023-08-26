import { doc, updateDoc } from "firebase/firestore";
import { UserI } from "../../../../types/user.type";
import { db } from "../../../firebaseInit";
import { collectionsKeys } from "../../collectionsKeys";

export const payReward = async (worker:UserI,reward:number) => {
    try{
        if(!worker.id) return;
        const userRef = doc(db,collectionsKeys.users,worker.id);
        await updateDoc(userRef,
            {
                balance:(worker.balance || 0) + +reward
            });
    }catch(err){
        console.error(err);
    }
}