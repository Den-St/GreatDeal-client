import { Bottom, Container, Input, Name, NoAccountNotification, RegistrationButton, RegistrationContainer, SocialButton, SocialsContainer, SubmitButton, Top } from "./styles"
import {LogoSvg} from "./../../assets/logo";

export const RegistrationComponent = () => {
  return <Container>
    <Top>
        <LogoSvg width="70" height="70" color={'#000000'}/>
        <Name>Great Deal</Name>
        <Input placeholder="Login"/>
        <Input placeholder="Password"/>
        <SubmitButton>Submit</SubmitButton>
    </Top>
    <Bottom>
        <RegistrationContainer>
            <NoAccountNotification>Already have an account?</NoAccountNotification>
            <RegistrationButton>Login</RegistrationButton>
        </RegistrationContainer>
        <SocialsContainer>
            <NoAccountNotification>You can sign up using this socials:</NoAccountNotification>
            <SocialButton>G</SocialButton>
        </SocialsContainer>
    </Bottom>
</Container>
}
