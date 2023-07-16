import { message } from "antd";
import { signInWithEmailAndPassword, AuthErrorCodes, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { authProvider, googleProvider } from "../firebase/firebaseInit";
import { RegistrationInterface } from "../types/registration.type";

export const useLogin = () => {
    const [success,setSuccess] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const onSubmit:SubmitHandler<RegistrationInterface> = async (data:RegistrationInterface) => {
        try{
            console.log("vcvcvc");
            await signInWithEmailAndPassword(authProvider,data.email,data.password);
            setSuccess(true);
        }catch(err){
            if(AuthErrorCodes.INVALID_PASSWORD === JSON.parse(JSON.stringify(err)).code 
                || AuthErrorCodes.INVALID_EMAIL === JSON.parse(JSON.stringify(err)).code ){
                messageApi.open({
                type: 'error',
                content: 'Invalid email or password',
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

    return {success,contextHolder,onSubmit,signInWithGoogle};
}