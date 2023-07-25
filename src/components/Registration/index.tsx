import { Bottom, Container, Name,Input, NoAccountNotification, RegistrationButton, RegistrationContainer, SocialButton, SocialsContainer, SubmitButton, Top } from "./styles"
import {LogoSvg} from "./../../assets/logo";
import { useForm } from "react-hook-form";
import { emailPattern } from "../../helpers/emailPattern";
import { Navigate } from "react-router-dom";
import { RegistrationInterface } from "../../types/registration.type";
import { useRegistration } from "../../hooks/registration.hook";
import {GoogleOutlined} from '@ant-design/icons';
import { signOut } from "firebase/auth";
import { googleAuthProvider } from "../../firebase/firebaseInit";
import { useEffect } from "react";

export const RegistrationComponent = () => {
    const {signInWithGoogle,onSubmit,success,contextHolder,showError} = useRegistration();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegistrationInterface>();
  
    useEffect(() => {
        if(errors.email?.message) showError(errors.email.message);
        if(errors.password?.message) showError(errors.password.message);
    },[errors.email, errors.password]);
    
  if(success) return <Navigate to={'/'}/>

  return <Container>
    {contextHolder}
    <Top onSubmit={handleSubmit(onSubmit)}>
        <button onClick={() => signOut(googleAuthProvider)}>dfsdf</button>
        <LogoSvg width="70" height="70" color={'#000000'}/>
        <Name>Great Deal</Name>
        <Input {...register('email',{required:true, pattern:emailPattern})}
        placeholder="Login"/>
        <Input {...register('password',{required:true, minLength:6})}
        type={"password"} placeholder="Password"/>
        {errors.email?.message}
        <SubmitButton value={"Submit"} type={'submit'}/>
    </Top>
    <Bottom>
        <RegistrationContainer>
            <NoAccountNotification>Already have an account?</NoAccountNotification>
            <RegistrationButton to={'/login'}>Login</RegistrationButton>
        </RegistrationContainer>
        <SocialsContainer>
            <NoAccountNotification>You can sign up using this socials:</NoAccountNotification>
            <SocialButton onClick={signInWithGoogle}><GoogleOutlined/></SocialButton>
        </SocialsContainer>
    </Bottom>
</Container>
}