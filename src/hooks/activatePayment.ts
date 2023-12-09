import { useDispatch } from 'react-redux';
import { useAppSelector } from './redux';
import { useEffect } from 'react';
import { useSearchParams } from "react-router-dom"
import { activatePayment } from '../firebase/db/deposit/edit/activatePayment';
import { addMoney } from '../store/userSlice';

export const useActivatePayment = () => {
    const depositId = useSearchParams()[0].get('deposit_id');
    const userId = useAppSelector(state => state.user.id);
    const dispatch = useDispatch();
    useEffect(() => {
        if(!depositId || !userId) return;
        activatePayment(depositId,userId).then(amount => amount && dispatch(addMoney({money:amount})));
    },[depositId,userId]);
    
}