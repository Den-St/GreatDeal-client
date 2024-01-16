import { useDispatch } from 'react-redux';
import { useAppSelector } from './redux';
import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom"
import { activatePayment } from '../firebase/db/deposit/edit/activatePayment';
import { addMoney } from '../store/userSlice';

export const useActivatePayment = () => {
    const [loading,setLoading] = useState(false);
    const [statusCode,setStatusCode] = useState<number>();
    const depositId = useSearchParams()[0].get('deposit_id');
    const userId = useAppSelector(state => state.user.id);
    const dispatch = useDispatch();

    const onActivatePayment = async () => {
        if(!depositId || !userId) return;
        setLoading(true);
        const res = await activatePayment(depositId,userId);
        setStatusCode(res.statusCode);
        if(res.amount) dispatch(addMoney({money:res.amount}));
        setLoading(false);
    }
    useEffect(() => {
        onActivatePayment();
    },[depositId,userId]);
    
    return {statusCode,loading};
}