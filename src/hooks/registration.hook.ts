import { message } from "antd";
import { createUserWithEmailAndPassword, AuthErrorCodes, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { authProvider, googleProvider } from "../firebase/firebaseInit";
import { RegistrationInterface } from "../types/registration.type";

export const useRegistration = () => {
    const [success,setSuccess] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    
    const onSubmit:SubmitHandler<RegistrationInterface> = async (data:RegistrationInterface) => {
        try{
            await createUserWithEmailAndPassword(authProvider,data.email,data.password)
            setSuccess(true);
        }catch(err){
            if(AuthErrorCodes.EMAIL_EXISTS === JSON.parse(JSON.stringify(err)).code){
                messageApi.open({
                type: 'error',
                content: 'Email already in use',
              });
            }
        }
      }

    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(authProvider,googleProvider);
            setSuccess(true);
        }catch(err){
            console.log(err);
        }
    }

    return {signInWithGoogle,onSubmit,success,contextHolder};
}