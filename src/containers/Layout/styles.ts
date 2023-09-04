import styled from "styled-components";
import { Media } from "../../assets/breakpoints";

export const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    font-family: helvetica;
    background:#8b8b8b;
`;

export const Main = styled.main`
    width:50%; 
    background:white;
    position:relative;
    ${Media.down.m}{
        width:100%;
    }
`;

export const Bottom = styled.nav`
    width:50%; 
    ${Media.down.m}{
        width:100%;
    }
`;