import { collectionsKeys } from './../../collectionsKeys';
import { db } from './../../../firebaseInit';
import { doc, updateDoc } from 'firebase/firestore';
import { LocationT } from './../../../../types/location.type';
export const updateUserLocation = async (userId:string,position:LocationT) => {
    try{
        const userRef = doc(db,collectionsKeys.users,userId);
        await updateDoc(userRef,{
            lastLocation:position
        });
    }catch(err){
        console.error(err);
    }
}