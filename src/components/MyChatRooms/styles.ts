import { Link } from 'react-router-dom';
import { styled } from "styled-components";
import { Media } from '../../assets/breakpoints';

export const Container = styled.div`
    height:90vh;
    ${Media.down.m}{
        height:90svh;
    }
    display:flex;
    flex-direction:column;
    gap:10px;
    padding-top:15px;
    box-sizing:border-box;
    overflow: scroll;
    background:rgb(31,32,36);
    .ant-empty-normal .ant-empty-description {
        color: white;
        font-size:25px;
    }
`;

export const ChatRoomContainer = styled(Link)`
    width: 100%;
    padding-left:5px;
    box-sizing:border-box;
    position:relative;
    display:flex;
    gap:10px;
    text-decoration:none;
    color:white;
    padding:5px;
    &:hover{
        transition:0.2s;
        background-color:#2b2b2f
    }
`;



export const UserName = styled.p`
    margin:0;
    width: 242px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    overflow-wrap: break-word;

`;

export const Right = styled.div`
    display:flex;
    flex-direction:column;
    gap:3px;
`;
export const LastMessageName = styled.p`
    margin:0 ;
`;

export const LastMessageText = styled.p`
    margin:0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    overflow-wrap: break-word;
`;

export const LastMessageContainer = styled.div`
    display:flex;
    flex-wrap:wrap;
    gap:3px;
`;