import { Button, Empty, Spin, Tag } from "antd";
import {CheckOutlined} from "@ant-design/icons";
import { Display } from "../../assets/Display";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { useChatRooms } from "../../hooks/chatRooms";
import { Avatar } from "../ChatRoom/styles";
import { ChatRoomContainer, Container, Right, LastMessageName, LastMessageText, UserName, LastMessageContainer } from "./styles";
import { useAppSelector } from "../../hooks/redux";
import { useEffect } from "react";
import { wrappedRoutes } from "../../consts/routes";
import { ChatRoomT } from "../../types/chatRoom.type";

export const MyChatRooms = () => {
    const {chatRooms,chatRoomsLoading,userId} = useChatRooms();
    useEffect(() => {
        document.title = 'My Chats - Great Deal';
    },[]);
    const getLastMessageUserName = (chatRoom:ChatRoomT) => chatRoom.lastMessage.sender.id === userId ? 'me' : !!chatRoom.lastMessage.sender.displayName ? chatRoom.lastMessage.sender.displayName + ':' : `user ` + chatRoom.lastMessage.sender.id + ':';

    return <Container>
        {!chatRoomsLoading ? chatRooms.sort((a) => a.job.status === 'done' ? 1 : -1).map(chatRoom => 
        <ChatRoomContainer key={chatRoom.id} to={wrappedRoutes.chat.replace(":id",chatRoom.id)}>
            {chatRoom?.jobCreator.id === userId 
            ? <Avatar src={chatRoom?.worker.photoURL || defaultAvatar}/>
            : <Avatar src={chatRoom?.jobCreator.photoURL || defaultAvatar}/>}
            <Right>
                {chatRoom?.jobCreator.id === userId 
                ? <UserName>{chatRoom.worker.displayName || 'user ' + chatRoom.worker.id}</UserName>
                : <UserName>{chatRoom.jobCreator.displayName || 'user ' + chatRoom.jobCreator.id}</UserName>}
                {chatRoom.lastMessage ? 
                <LastMessageContainer>
                    <LastMessageName>{getLastMessageUserName(chatRoom)}</LastMessageName>
                    <LastMessageText>{chatRoom.lastMessage.text || !!chatRoom.lastMessage.images?.length && 'Photo'}</LastMessageText>
                </LastMessageContainer>
                : 'No messages'}
            </Right>
            {chatRoom.job.status === 'done' && <Display position="absolute" right="5px"><Tag icon={<CheckOutlined/>} color="success">Done</Tag></Display>}
        </ChatRoomContainer>
        ) : <Display width="100%" height="100%" justify="center" align="center"><Spin/></Display>} 
        {!chatRoomsLoading && !chatRooms.length && <Display width="100%" height={'100%'} align={'center'} justify={'center'}><Empty description={'No chats'} image={Empty.PRESENTED_IMAGE_SIMPLE} /></Display>}
    </Container>
}