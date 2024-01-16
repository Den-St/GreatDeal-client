import { Link } from "react-router-dom";
import styled from "styled-components";
import { Media } from "../../assets/breakpoints";

export const Container = styled.nav`
    width:100%;
    height:10vh;
    ${Media.down.m}{
        height:10svh;
    }
    background-color:white;
    display:flex;
    align-items:center;
    justify-content:space-around;
    box-sizing:border-box;
    background:rgb(47,48,53);
`;
export const NavLink = styled(Link)<{$active:boolean}>`
    text-decoration:none;
    color:white;
    font-size:25px;
    background:${({$active}) => $active && `#8c8b8b63;`};
    border-radius:50%;
    padding:6px;
    display: flex;
    justify-content: center;
    flex-direction:column;
    align-items:center;
    position:relative;
`;

export const UserBalance = styled.span`
    color:white;
    font-size:15px;
    position:absolute;
    top:30px;
`;      