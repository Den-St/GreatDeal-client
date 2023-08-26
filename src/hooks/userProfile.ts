import { useEffect } from 'react';
import { getUserById } from './../firebase/db/users/get/getUserById';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserI } from '../types/user.type';
import { getReceiptsByWorkerId } from '../firebase/db/receipts/get/getByWorkerId';

export const useUserProfile = () => {
    const userId = useParams().id;
    const [user,setUser] = useState<UserI>();
    const [stats,setStats] = useState<{rating:number,numberOfJobs:number}>();
    const [reviews,setReviews] = useState<{review:string,creator:UserI,rate:number}[]>([]);
    const [loading,setLoading] = useState<{user:boolean,stats:boolean}>({user:true,stats:true});

    const fetch = async () => {
        if(!userId) return;
        setLoading(prev => ({...prev,user:true}));
        const resUser = await getUserById(userId);
        setUser(resUser);
        setLoading(prev => ({...prev,user:false}));

        setLoading(prev => ({...prev,stats:true}));
        const receipts = await getReceiptsByWorkerId(userId);

        if(!receipts) {
            setLoading(prev => ({...prev,stats:false}));
            return;
        }
        setReviews(receipts.map(receipt => {return {review:receipt.review,creator:receipt.jobCreator,rate:receipt.rate}}));
        setStats({rating:+(receipts.reduce((acc,cur) => acc + cur.rate,0) / receipts.length).toFixed(1)
                  ,numberOfJobs:receipts.length});
        setLoading(prev => ({...prev,stats:false}));
    }
    
    useEffect(() => {
        if(userId) fetch();
    },[userId])

    return {user,loading,stats,reviews};
}