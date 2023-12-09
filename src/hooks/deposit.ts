import { createDeposit } from './../firebase/db/deposit/create/createDeposit';
import { useAppSelector } from './redux';
import { useState } from 'react';
import { useRef } from 'react';
import { private_key, public_key } from '../consts/payment/paymentKeys';
import { base64_encode, getSignature, getStrToSignature } from '../consts/payment/paymentInformationGenerator';
import { getFunctions, httpsCallable } from "firebase/functions";
import { functions } from '../firebase/firebaseInit';

export const useDeposit = () => {
    const user = useAppSelector(state => state.user);
    const [loading,setLoading] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const dataInputRef = useRef<HTMLInputElement>(null);
    const signatureInputRef = useRef<HTMLInputElement>(null);
    const [sum,setSum] = useState<number>(100);

    const onBuy = async () => {
        if(!user.id || !dataInputRef.current || !signatureInputRef.current || !sum) return;
        setLoading(true);

        const createdAt = new Date();
        const deposit_id = await createDeposit({user:user.id,amount:+sum,createdAt,status:'pending'});

        const version = "3";
        const action = "pay";
        const amount = sum;
        const currency = "UAH";
        const description = 'Інформація про користувача:' + '\n' +
                            user.id + '\n' +
                            (user.displayName || '') + '\n' + 
                            'Інформація замовлення:' + '\n' +
                            createdAt.toDateString() + '\n' +
                            'сума платежу = ' + amount + '\n';
        
        const result_url = process.env.REACT_APP_AFTER_PAYMENT_PAGE + `?deposit_id=${deposit_id}`;
        const json_string = {public_key,private_key,version,action,amount,currency,description,order_id:deposit_id,result_url};
        const data = base64_encode(json_string);
        const sign_string = getSignature(private_key || '',data);

        const signature = getStrToSignature(sign_string);

        setLoading(false);

        dataInputRef.current.value = data;
        signatureInputRef.current.value = signature;
        formRef.current?.submit();
    }

    return {onBuy,setSum,sum,loading,formRef,dataInputRef,signatureInputRef}
}