import styled from "styled-components";
import { Media } from "./breakpoints";

export const UserLocationLoader = styled.div`
    background-color:#1f1f1f;
    opacity:0.95;
    display:flex;
    align-items:center;
    justify-content:center;
    position:absolute;
    width: 100%;
    height:100vh;
    ${Media.down.m}{
        height:100svh;
    }
    top:0;
    bottom:100%;
    left:0;
    right:100%;
    z-index:1001;
`;