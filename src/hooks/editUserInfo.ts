import { useEffect } from 'react';
import { useAppSelector, useAppDispacth } from './redux';
import { UserI } from './../types/user.type';
import { useState } from 'react';
import { changeUserInfo } from '../firebase/db/users/patch/changeUserInfo';
import { setUser } from '../store/userSlice';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase/firebaseInit';
import { v4 } from 'uuid';
export const useEditUserInfo = () => {
    const [newUserInfo,setNewUserInfo] = useState<UserI | null>(null);
    const [isEditingUserInfo,setIsEditingUserInfo] = useState(false);
    const dispatch = useAppDispacth();
    const [newImage,setNewImage] = useState<File>();

    const user = useAppSelector(state => state.user);
    console.log(newImage);
    const changePhoto = async () => {
        if(!newImage) return;
        const newImageRef = ref(storage, `profileImage/${newImage?.name + v4()}`)
        const newImageUrl = await uploadBytes(newImageRef,newImage); 
        return newImageUrl.metadata.fullPath
        // setNewUserInfo(prev => ({...prev,photoURL:newImageUrl?.metadata.fullPath}));
     }
     console.log('1',newUserInfo)
    const onConfirmEditUserInfo = async () => {
        if(!newUserInfo) return;
        changePhoto().then(async (newImageUrl) => await changeUserInfo({...newUserInfo,photoURL:newImageUrl || ''}));
        setIsEditingUserInfo(false);
        dispatch(setUser({
            ...newUserInfo
        }));
    }
    const changeNameUserInfo = (text:string) => {
        setNewUserInfo(prev => (
            {
                ...prev,
                displayName:text
            }
        ));
    }
    useEffect(() => {
        if(user) setNewUserInfo(user);
    },[user]);
    return {onConfirmEditUserInfo,changeNameUserInfo,isEditingUserInfo,setIsEditingUserInfo,setNewImage,newImage,newUserInfo};
}