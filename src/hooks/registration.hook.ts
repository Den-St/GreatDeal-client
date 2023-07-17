import { createUserI } from './../types/user.type';
import { createUser } from './../firebase/db/users/create/createUser';
import { message } from "antd";
import { createUserWithEmailAndPassword, AuthErrorCodes, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { googleAuthProvider, googleProvider } from "../firebase/firebaseInit";
import { RegistrationInterface } from "../types/registration.type";

export const useRegistration = () => {
    const [success,setSuccess] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    
    const onSubmit:SubmitHandler<RegistrationInterface> = async (data:RegistrationInterface) => {
        try{
            await createUserWithEmailAndPassword(googleAuthProvider,data.email,data.password);
            if(googleAuthProvider.currentUser === null) return;
            const {displayName, email, photoURL} = googleAuthProvider.currentUser;
            const {creationTime} = googleAuthProvider.currentUser.metadata;
            await createUser({email,
                              displayName,
                              photoURL,
                              createdAt:creationTime
                            });
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
            await signInWithPopup(googleAuthProvider,googleProvider);
            if(googleAuthProvider.currentUser === null) return;
            const {displayName, email, photoURL} = googleAuthProvider.currentUser;
            const {creationTime} = googleAuthProvider.currentUser.metadata;
            await createUser({
                              email,
                              displayName,
                              photoURL,
                              createdAt:creationTime
                            });
            setSuccess(true);
        }catch(err){
            console.log(err);
        }
    }

    return {signInWithGoogle,onSubmit,success,contextHolder};
}