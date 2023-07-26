import { useParams } from 'react-router-dom';
import { getUserById } from './../firebase/db/users/get/getUserById';
import { useEffect } from 'react';
import { UserI } from './../types/user.type';
import { useState } from 'react';

export const useUserProfile = () => {
    const [user,setUser] = useState<UserI | null>();
    const [userLoading,setUserLoading] = useState<boolean>(true);
    const userId = useParams().id;
    const fetch = async () => {
        if(!userId) return;
        try{
            const res = await getUserById(userId);
            setUser(res);
            setUserLoading(false);
        }catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        fetch();
    },[])

    return {user,userLoading};
}