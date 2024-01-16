import { Media } from './../../assets/breakpoints';
import { Link } from 'react-router-dom';
import styled from "styled-components";

export const Container = styled.div`
    display:flex;
   flex-direction: column;
`;

export const Top = styled.form`
    background: linear-gradient(90deg, rgba(56,56,56,1) 0%, rgba(57,57,57,1) 12%, rgba(64,64,64,1) 20%, rgba(65,65,65,1) 28%, rgba(66,66,66,1) 35%, rgba(67,67,67,1) 44%, rgba(68,68,68,1) 51%, rgba(69,69,69,1) 58%, rgba(68,68,68,1) 66%, rgba(67,67,67,1) 73%, rgba(66,66,66,1) 78%, rgba(65,65,65,1) 83%, rgba(64,64,64,1) 88%, rgba(57,57,57,1) 100%);
    padding: 50px 0 55px 0;
    box-sizing:border-box;
    display:flex;
    flex-direction: column;
    align-items: center;
    gap:26px;
    height:77.8vh;
    ${Media.down.m}{
        height:77.8svh;
    }
    ${Media.down.xxl}{
        height:69.8vh;
    }
    ${Media.down.m}{
        height:67.8svh;
    }
    input{
        width:250px;
        height:36px;
    }
    input[type=submit]{
        width:30%;
    }
`;

export const Name = styled.p`
    font-size: 30px;
    margin:0;
    color: white;
`;

export const Input = styled.input`
    height: 40px;
    width: 70%;
    font-size: 17px;
    border: 1px solid white;
    color:black;
    border-radius: 5px;
    padding-left: 15px;
`;

export const LoginButtonContainer = styled.input`
    width: 30%;
    height: 40px;
    border-radius: 10px;
    background-color: white;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    align-items:center;
    justify-content: center;
    font-size: 20px;
    color:black;
`;

export const Title = styled.p`
    font-size: 30px;
    font-family: Helvetica;
    font-weight: 400;
    margin:0;
    color:white;
`;

export const Bottom = styled.div`
    background-color: white;
    display:flex;
    flex-direction:column;
    height: 100%;
    padding:15px 0;
    align-items: center;
    gap:45px;
`;

export const NoAccountNotification = styled.p`
    font-size: 16px;
    margin:0;
    color: black;
`;

export const RegistrationButtonContainer = styled(Link)`
    background-color: rgba(60,60,60,1);
    color:white;
    text-decoration: none;
    height: 40px;
    padding:5px 15px;
    width: 100%;
    border-radius: 25px;
    display:flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
`;

export const Registrationp = styled.p`
    font-size: 22px;
    color: #ffffff;
`;

export const RegistrationContainer = styled.div`
    display:flex;
    flex-direction:column;
    width: 45%;
    gap: 5px;
    align-items: center;
`;

export const SocialsContainer = styled.div`
    align-items: center;
    display:flex;
    flex-direction:column;
    gap: 5px;
`;

export const SocialButtonContainer = styled.button`
   width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    background:transparent;
    outline:none;
    border:none;
`;