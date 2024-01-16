import { Link } from 'react-router-dom';
import styled from "styled-components";
import { Media } from '../../assets/breakpoints';

export const Container = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
`;

export const ConfirmContainer = styled.div`
    height: 100vh;
    ${Media.down.m}{
        height:100svh;
    }
    font-family:helvetica;
    display:flex;
    flex-direction:column;
    background:rgb(32,32,36);
    color:white;
    textarea{
        width:100%;
        height:150px;
    }
`;

export const CreateReviewContainer = styled.div`
    display:flex;
    flex-direction:column;
    gap:10px;
    align-items:center;
`;

export const InputBlock = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:5px;
    .anticon{
        font-size:30px;
    }
`;

export const InputHeader = styled.p`
    margin:0;
    font-size:20px;
`;

export const CreateMessageContainer = styled.form`
    width:100%;
    display:flex;
    justify-content:space-between;
    padding:5px;
    gap:5px;
    min-height:7vh;
    ${Media.down.m}{
        min-height:7svh;
    }
    box-sizing:border-box;
    border-top:1px solid black;
    align-items:center;
    position:relative;
    background:rgb(19,21,27);
    bottom:
`;
export const LeavePage = styled(Link)`
    padding:10px;
    border-radius:50%;
    background-color:transparent;
    font-size:20px; 
    text-decoration:none;
    color:white;
`;

export const CreateButton = styled.input`
    border:none;
    outline:none;
    background:#1677ff;
    color:white;    
    padding:7px;
    border-radius:5px;
`;

export const MessagesContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    gap:5px;
    padding:5px 15px 5px 5px;
    box-sizing:border-box;
    height:79vh;
    ${Media.down.m}{
        height:79svh;
    }
    overflow-y:scroll;
    background:rgb(32,32,36);
    
`;

export const YourMessageContainer = styled.div`
    border-radius:18px;
    border-bottom-right-radius:2px;
    max-width:220px;
    background:#3797f0;
    color:white;
    padding:7px 12px;
    box-sizing:border-box;
    width:fit-content;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-self:end;
`;

export const MessageText = styled.p`
    margin:0;
    overflow-wrap: break-word;
`;

export const NotYourMessageContainer = styled.div`
    border-radius:18px;
    border-bottom-left-radius:2px;
    max-width:220px;
    background:#efefef;
    color:black;
    padding:7px 12px;
    box-sizing:border-box;
    width:fit-content;
    display:flex;
    flex-direction:column;
`;

export const HeaderContainer = styled.div`
    width:100%;
    height:7vh;
    ${Media.down.m}{
        height:7svh;
    }
    border-bottom:1px solid black;
    box-sizing:border-box;
    display:flex;
    align-items:center;
    background:rgb(19,21,27);
`;

export const JobInfoContainer = styled.div`
    display:flex;
    height: 7vh;
    ${Media.down.m}{
        height:7svh;
    }
    padding:5px;
    box-sizing:border-box;
    gap:5px;
    border-bottom:1px solid black;
    background:rgb(32,32,36);
    color:white;
`;

export const JobInfoText = styled.p`
    margin:0;
    width:90%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    overflow-wrap: break-word;
`;

export const UserInfo = styled(Link)`
    display:flex;
    align-items:center;
    gap:5px;
    text-decoration:none;
    color:white;
    width:90%;
`;

export const Avatar = styled.img`
    width:40px;
    height:40px;
    border-radius:50%;
    object-fit:fit-content;
`;
export const UserName = styled.p`
    margin:0;
`;

export const MessageImage = styled.img`
    max-width:150px;
    max-height: 150px;
    object-fit:contain;
    margin-top:3px;
`;
export const CreatedAt = styled.div`
    width:100%;
    font-size:12px;
    margin-top:3px;
`;

export const ImagePreviewContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    background: rgb(32,32,36);
    padding: 5px;
    position: absolute;
    overflow-x: scroll;
    box-sizing: border-box;
    gap: 40px;
    height: 105px;
    /* bottom: 114px; */
    top:93px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
`;

export const RemoveImage = styled.button`
    width:30px;
    position:relative;
    height:30px;
    font-size:25px;
    background:transparent;
    border:none;
    outline:none;
    position:absolute;
    color:white;
`;

export const ImageContainer = styled.div`
    position:relative;
    .ant-image{
        width: 90px;
        height: 90px;
        position:relative;
        object-fit:contain;
    }
`;

export const DoneButton = styled.button`
    width:30px;
    height:30px;
    display:flex;
    align-items:center;
    justify-content:center;
    background:#2e85d5;
    border:none;
    outline:none;
    border-radius:15px;
`;

export const Back = styled.button`
    padding:10px;
    border-radius:50%;
    background-color:transparent;
    font-size:20px; 
    text-decoration:none;
    color:white;
    border:none;
    width:100%;
    display:flex;
`;

export const ConfirmButton = styled.button`
    border:none;
    outline:none;
    background:#2e85d5;
    width:fit-content;
`;  

export const FileInputContainer = styled.div`
    input{
        opacity:0;
        position:absolute;
        z-index:2;
        width:40px;
    cursor:pointer;
    }
    .anticon{
        position:relative;
        z-index:1;
        font-size:25px;
    cursor:pointer;
    }
     &:hover{
            background:#e7e7e7;
        }

    cursor:pointer;
    padding:5px;
    border-radius:5px;
    display:flex;
    position:relative;
    align-items:center;
    height:30px;
    color:white;
`;

export const MessageTextInput = styled.textarea`
    position:absolute;
    width:295px;
    ${Media.down.m}{
        width:250px;
    }
`;

export const MessageInputValue = styled.p`
    width:250px;
    background:gray;
    overflow-wrap: break-word;
`;

