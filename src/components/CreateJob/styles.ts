import { Link } from 'react-router-dom';
import styled from "styled-components";

export const Container = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    flex-direction:column;
    padding-top:7vh;
    box-sizing:border-box;
`;

export const Header = styled.div`
    height:7vh;
    background-color:rgb(19,21,27);
    display:flex;
    align-items:center;
    gap:10px;
    width:50%;
    color:white;
    position:fixed;
    top:0;
    z-index:1500;
`;

export const BackButton = styled.button`
    padding:10px;
    background-color:transparent;
    font-size:20px;
    border:none;
    color:white;
`;

export const LeavePage = styled(Link)`
    padding:10px;
    border-radius:50%;
    background-color:transparent;
    font-size:20px; 
    text-decoration:none;
    color:white;
`;

export const StepTitle = styled.h1`
    margin:0;
    font-size:20px;
`;

export const ConfirmLocationButton = styled.p`
    margin:0;
    font-size:20px;
    width: 100%;
    height: 50px;
    background-color:#56d660;
    border:none;
    outline:none;
    display:flex;
    align-items:center;
    justify-content:center;

    position:absolute;
    top:calc(100vh - 50px);
    left:0;
    z-index:1001;
`;