import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { LogoSvg } from "../../assets/logo"
import { emailPattern } from "../../helpers/emailPattern";
import { useLogin } from "../../hooks/login.hook";
import { RegistrationInterface } from "../../types/registration.type";
import { LoginButtonContainer, Container, Input, Name, Top, Bottom, RegistrationContainer, NoAccountNotification, RegistrationButtonContainer, SocialsContainer, SocialButtonContainer } from "./styles"
import {GoogleOutlined} from '@ant-design/icons';
import { useEffect } from "react";
import { wrappedRoutes } from "../../consts/routes";
import { passwordPattern } from "../../consts/passwordPattern";

export const LoginComponent = () => {
    const {success,contextHolder,onSubmit,signInWithGoogle,showError} = useLogin();
    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm<RegistrationInterface>();
    useEffect(() => {
        document.title = 'Login - GreatDeal';
    },[]);
    useEffect(() => {
        if(errors.email?.message) showError(errors.email.message);
        if(errors.password?.message) showError(errors.password.message);
    },[errors.email, errors.password]);
    
  if(success) return <Navigate to={wrappedRoutes.home}/>
  return <Container>
        {contextHolder}
        <Top onSubmit={handleSubmit(onSubmit)}>
            <LogoSvg width="70" height="70" color={'#ffffff'}/>
            <Name>Great Deal</Name>
            <Input {...register('email',{required:true, pattern:{message:"Incorrect email form",value:emailPattern}})}
            placeholder="Login"/>
            <Input {...register('password',{required:"Incorrect password form", minLength:6})}
            type={"password"} placeholder="Password"/>
            <Input {...register('password',{required:true, minLength:{value:10,message:'Password must be longer than 10 symbols'},pattern:{value:passwordPattern,message:'Password must include special symbols!'}})}/>
            <LoginButtonContainer type={'submit'} value={'Submit'}/>
        </Top>
        <Bottom>
            <RegistrationContainer>
                <NoAccountNotification>Don't have an account?</NoAccountNotification>
                <RegistrationButtonContainer to={wrappedRoutes.registration}>Registration</RegistrationButtonContainer>
            </RegistrationContainer>
            <SocialsContainer>
                <NoAccountNotification>You can sign up using this socials:</NoAccountNotification>
                <SocialButtonContainer onClick={signInWithGoogle}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
                </SocialButtonContainer>
            </SocialsContainer>
        </Bottom>
    </Container>
}