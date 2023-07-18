import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { LogoSvg } from "../../assets/logo"
import { emailPattern } from "../../helpers/emailPattern";
import { useLogin } from "../../hooks/login.hook";
import { RegistrationInterface } from "../../types/registration.type";
import { LoginButtonContainer, Container, Input, Name, Top, Bottom, RegistrationContainer, NoAccountNotification, RegistrationButtonContainer, SocialsContainer, SocialButtonContainer } from "./styles"
import {GoogleOutlined} from '@ant-design/icons';

export const LoginComponent = () => {
    const {success,contextHolder,onSubmit,signInWithGoogle} = useLogin();
    const {
        register,
        handleSubmit,
    } = useForm<RegistrationInterface>();
 
  if(success) return <Navigate to={'/'}/>
  return <Container>
        {contextHolder}
        <Top onSubmit={handleSubmit(onSubmit)}>
            <LogoSvg width="70" height="70" color={'#ffffff'}/>
            <Name>Great Deal</Name>
            <Input {...register('email',{required:true, pattern:emailPattern})}
            placeholder="Login"/>
            <Input {...register('password',{required:true, minLength:6})}
            type={"password"} placeholder="Password"/>
            <LoginButtonContainer type={'submit'} value={'Submit'}/>
        </Top>
        <Bottom>
            <RegistrationContainer>
                <NoAccountNotification>Don't have an account?</NoAccountNotification>
                <RegistrationButtonContainer to={'/registration'}>Registration</RegistrationButtonContainer>
            </RegistrationContainer>
            <SocialsContainer>
                <NoAccountNotification>You can sign up using this socials:</NoAccountNotification>
                <SocialButtonContainer onClick={signInWithGoogle}><GoogleOutlined/></SocialButtonContainer>
            </SocialsContainer>
        </Bottom>
    </Container>
}