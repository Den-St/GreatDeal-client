import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const Container = styled.div`
    display:flex;
    flex-direction:column;
    min-width:150px;
    background:rgb(47,48,53);
    color:white;
`;

export const Title = styled(Link)`
    margin:0;
    text-decoration:none;
    color:black;
    font-size:20px;
`;

export const Reward = styled.span`
    font-size:18px;
    font-weight:500;
`;

export const BottomContainer = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    min-width:190px;   
`;

export const ApplyButton = styled.button<{$iscreator:boolean,$isalreadyhave:boolean}>`
    border:none;
    outline:none;
    font-size:18px;
    color:black;
    background: ${({$isalreadyhave,$iscreator}) => $iscreator ? 'grey' : $isalreadyhave ? 'red' : 'green'};
`;

export const Creator = styled.div`
    display:flex;
    gap:5px;
    align-items:center;
`;

export const Avatar = styled.img`
    width: 30px;
    heigth:30px;
    border-radius:50%;
`;

export const CreatorName = styled(Link)`
    text-decoration:none;
    color:black;
    
`;