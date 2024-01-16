import { Media } from './../breakpoints';
import styled from "styled-components";

export const Container = styled.div`
    position:absolute;
    width:100vw;
    height:100vh;
    ${Media.down.m}{
        height:100svh;
    }
    background-color: white;
    opacity:0.9;
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:100;
`;