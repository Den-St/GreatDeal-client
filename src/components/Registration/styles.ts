import { Link } from "react-router-dom";
import styled from "styled-components";
import { Media } from "../../assets/breakpoints";

export const Container = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
`;

export const Top = styled.form`
    padding: 50px 0 55px 0;
    box-sizing:border-box;
    display:flex;
    flex-direction: column;
    align-items: center;
    gap:26px;
    background-color: white;
    height:77.8vh;
    ${Media.down.xxl}{
        height:69.8vh;
    }
     ${Media.down.m}{
        height:67.8vh;
    }
    input{
        width:250px;
        height:36px;
    }
    input[type=submit]{
        width:30%;
    }
`;

export const Name = styled.label`
    font-size: 30px;
    color:black;
`;

export const Input = styled.input`
    height: 40px;
    width: 70%;
    font-size: 17px;
    border: 1px solid black;
    border-radius: 5px;
    padding-left: 15px;
`;

export const SubmitButton = styled.input`
    width: 30%;
    border-radius: 10px;
    align-items:center;
    justify-content: center;
    font-size: 20px;
    color:white;
    background-color: #404040;
`;

export const Title = styled.label`
    font-size: 30px;
    font-family: Helvetica;
    font-weight: 400;
    color:white;
`;

export const Bottom = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    padding: 15px 0;
    gap:57px;
    height: 100%;
    background: rgb(56,56,56);
`;

export const NoAccountNotification = styled.label`
    font-size: 16px;
    color: white;
`;

export const RegistrationButton = styled(Link)`
    width: 45%;
    text-decoration: none;
    height: 40px;
    background-color: white;
    border-radius: 25px;
    display:flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    color: rgba(60,60,60,1);
`;

export const RegistrationContainer = styled.div`
    display: flex;
    flex-direction:column;
    align-items: center;
    gap: 5px;
`;

export const SocialsContainer = styled.div`
    display: flex;
    flex-direction:column;
    align-items: center;
    gap: 5px;
`;

export const SocialButton = styled.button`
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