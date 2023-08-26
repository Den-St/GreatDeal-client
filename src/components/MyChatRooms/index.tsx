import { Spin, Tag } from "antd";
import {CheckOutlined} from "@ant-design/icons";
import { Display } from "../../assets/Display";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { useChatRooms } from "../../hooks/chatRooms";
import { Avatar } from "../ChatRoom/styles";
import { ChatRoomContainer, Container, Right, LastMessageName, LastMessageText, UserName, LastMessageContainer } from "./styles";

export const MyChatRooms = () => {
    const {chatRooms,chatRoomsLoading,userId} = useChatRooms();
    console.log(chatRooms)
    return <Container>
        {!chatRoomsLoading ? chatRooms.sort((a) => a.job.status === 'done' ? 1 : -1).map(chatRoom => 
        <ChatRoomContainer key={chatRoom.id} to={'/chat/'+chatRoom.id}>
            {chatRoom?.jobCreator.id === userId 
            ? <Avatar src={chatRoom?.worker.photoURL || defaultAvatar}/>
            : <Avatar src={chatRoom?.jobCreator.photoURL || defaultAvatar}/>}
            <Right>
                {chatRoom?.jobCreator.id === userId 
                ? <UserName>{chatRoom.worker.displayName || 'user ' + chatRoom.worker.id}</UserName>
                : <UserName>{chatRoom.jobCreator.displayName || 'user ' + chatRoom.jobCreator.id}</UserName>}
                {chatRoom.lastMessage ? 
                <LastMessageContainer>
                    <LastMessageName>{chatRoom.lastMessage.sender.displayName + ':' || `user` + chatRoom.lastMessage.sender.id + ':'}</LastMessageName>
                    <LastMessageText>{chatRoom.lastMessage.text}</LastMessageText>
                </LastMessageContainer>
                : `No messages yet`}
            </Right>
            {chatRoom.job.status === 'done' && <Display position="absolute" right="5px"><Tag icon={<CheckOutlined/>} color="success">Done</Tag></Display>}
        </ChatRoomContainer>
        ) : <Display width="100%" height="100%" justify="center" align="center"><Spin/></Display>} 
    </Container>
}