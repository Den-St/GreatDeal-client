import { storage } from './../../../firebaseInit';
import { getDownloadURL, ref } from 'firebase/storage';
import { collectionsKeys } from '../../collectionsKeys';
import { db } from '../../../firebaseInit';
import { doc, setDoc } from 'firebase/firestore';
import { UserI } from '../../../../types/user.type';

export const changeUserInfo = async (newUserInfo:UserI) => {
    try{
        if(!newUserInfo.id) return;
        const userRef = doc(db,collectionsKeys.users,newUserInfo.id);
        if(newUserInfo.photoURL?.includes('profileImage')){
            getDownloadURL(ref(storage,newUserInfo.photoURL)).then(async (url) => {
                await setDoc(userRef,{
                    ...newUserInfo,
                    photoURL:url
                });
            })
        }
        await setDoc(userRef,{
            ...newUserInfo
        });
    }catch(err){
        console.error(err);
    }
}