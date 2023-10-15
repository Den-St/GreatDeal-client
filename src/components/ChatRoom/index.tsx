import { Button, Dropdown, MenuProps, Rate, Row, Skeleton, Space, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { useChatRoom } from "../../hooks/chatRoom";
import { NotYourMessage } from "./NotYourMessage";
import { Avatar, Container, CreateButton, CreateMessageContainer, HeaderContainer, JobInfoContainer, MessagesContainer, UserInfo, UserName, LeavePage, ConfirmContainer, ImagePreviewContainer, RemoveImage, ImageContainer, DoneButton, Back, ConfirmButton, FileInputContainer, MessageTextInput, MessageInputValue, CreateReviewContainer, InputHeader, InputBlock } from "./styles";
import { YourMessage } from "./YourMessage";
import {ArrowLeftOutlined,CloseCircleOutlined,CheckOutlined,UploadOutlined,MoreOutlined} from "@ant-design/icons";
import { useDoneJob } from "../../hooks/doneJob.hook";
import { navRoutes } from "../../consts/routes";
import { Navigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { useForm, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { CreateMessageFormT } from "../../types/message.type";
import { defaultAvatar } from "../../consts/defaultAvatar";
import {Image} from "antd";
import { Display } from "../../assets/Display";
import { ReportForm } from "../ReportForm";

export const ChatRoom = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch
    } = useForm<CreateMessageFormT>();

    const clearInputs = () => {
        setValue('text','');
        setValue('images',null);
    }
    const {messages,messagesLoading,chatRoom,chatRoomLoading,onCreateMessage,userId} = useChatRoom(clearInputs);
    const {onDoneJob,isOnDoneJob,rate,setRate,confirmDoneJob,leaveDoneJob,isWorkFinished,review,setReview} = useDoneJob();
    const [isOnReport,setIsOnReport] = useState(false);
    
    const menu: MenuProps['items'] = [
        {
          label: <Button onClick={() => setIsOnReport(true)} danger>Report</Button>,
          key: '0',
        },
    ];

    const removeImage = (image:File) => {
        setValue('images',watch('images')?.filter(file => file.name !== image.name && file.lastModified !== image.lastModified) || []);
    }
    if(isWorkFinished) return <Navigate to={'/'}/>

    if(isOnReport && chatRoom?.jobCreator.id && chatRoom?.worker.id) return <ReportForm leave={() => setIsOnReport(false)} suspect={chatRoom?.jobCreator.id === userId ? chatRoom?.worker.id : chatRoom?.jobCreator.id} chat={chatRoom?.id}/>

    if(isOnDoneJob) return <ConfirmContainer>
        <Back onClick={() => leaveDoneJob()}>
            <ArrowLeftOutlined />
        </Back>
        <CreateReviewContainer>
            <h1>Reward: {chatRoom?.job.reward}</h1>
            <InputBlock>
                <InputHeader>Write a review for worker:</InputHeader>
                <TextArea value={review} onChange={(e) => setReview(e.target.value)}/>
            </InputBlock>
            <InputBlock>
                <InputHeader>Rate worker:</InputHeader>
                <Rate  value={rate} onChange={setRate}/>
            </InputBlock>
            <Button type="primary" onClick={() => confirmDoneJob(chatRoom?.job,chatRoom?.worker)}>Confirm</Button>
        </CreateReviewContainer>
    </ConfirmContainer>

    return <Container>
        <HeaderContainer>
            <LeavePage to={navRoutes.myChatrooms.route}>
                <ArrowLeftOutlined/>
            </LeavePage>
            {!chatRoomLoading ? chatRoom?.jobCreator.id === userId 
            ? <Display width="100%" align="center" gap="10px">
              <UserInfo to={'/user/'+chatRoom?.worker.id}>
                <Avatar src={chatRoom?.worker.photoURL || defaultAvatar}/>
                <UserName>{chatRoom?.worker.displayName || 'user ' + chatRoom?.worker.id}</UserName>
              </UserInfo>
              <Dropdown menu={{items: menu}} trigger={['click']}><Button style={{'fontSize':'20px','border':'none',padding:'none'}} ghost type={'dashed'}><MoreOutlined /></Button></Dropdown>
              </Display>
            : <Display width="100%" align="center" gap="10px">
              <UserInfo to={'/user/'+chatRoom?.jobCreator.id}>
                <Avatar src={chatRoom?.jobCreator.photoURL || defaultAvatar}/>
                <UserName>{chatRoom?.jobCreator.displayName || 'user ' + chatRoom?.jobCreator.id}</UserName>
              </UserInfo> 
              <Dropdown menu={{items: menu}} trigger={['click']}><Button style={{'fontSize':'20px','border':'none',padding:'none'}} ghost type={'dashed'}><MoreOutlined /></Button></Dropdown>
              </Display>
              : <Space>
                    <Skeleton.Avatar size={'default'}/>
                    <Skeleton.Button size={'default'}/>
                </Space>}

        </HeaderContainer>
        
        <JobInfoContainer>
            {!chatRoomLoading ? 
            <>
                {chatRoom?.job.title}
                {chatRoom?.jobCreator.id === userId && chatRoom?.job.status !== 'done' 
                    && <Button type="primary" onClick={onDoneJob}>
                            <CheckOutlined />
                       </Button>}
            </>
            : <Skeleton.Button size="large"/>}
        </JobInfoContainer> 
        <MessagesContainer>
            {!messagesLoading ? messages?.map(message => 
                message.sender.id === userId 
                    ? <YourMessage key={message.id} message={message}/> 
                    : <NotYourMessage key={message.id} message={message}/>
            ) : <Display justify="center" align="center" width="100%" height="100vh"><Spin/></Display>}
        </MessagesContainer>
        {!!watch('images')?.length && <ImagePreviewContainer>
            {watch('images')?.map(image => <ImageContainer>
                <Image src={URL.createObjectURL(image)}
                    preview={{src: URL.createObjectURL(image)}}
                />
                <RemoveImage onClick={() => removeImage(image)}><CloseCircleOutlined /></RemoveImage>
                </ImageContainer>)}
            </ImagePreviewContainer>}
        <CreateMessageController register={register} text={watch('text')} handleSubmit={handleSubmit} onCreateMessage={onCreateMessage} setValue={setValue} />
    </Container>
}

type CreateMessageProps = {
    register:UseFormRegister<CreateMessageFormT>,
    text:string,
    handleSubmit:UseFormHandleSubmit<CreateMessageFormT, undefined>,
    onCreateMessage:(data: CreateMessageFormT) => Promise<void>,
    setValue:UseFormSetValue<CreateMessageFormT>,
}

const CreateMessageController:React.FC<CreateMessageProps> = ({register,text,handleSubmit,onCreateMessage,setValue}) => {
    const onChangeTextInput = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue('text',e.target.value);
    }

    const onImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        //@ts-ignore
        setValue('images',Object.keys(e.target.files).map(fileIndex => e.target.files[+fileIndex])) 
    }  

    return <CreateMessageContainer onSubmit={handleSubmit(onCreateMessage)} >
        <TextArea autoSize={true} onChange={onChangeTextInput} autoComplete={"off"} value={text}/>
        <FileInputContainer>
            <UploadOutlined/>
            <input type={'file'} onChange={onImageChange} multiple={true}/>
        </FileInputContainer>
        <CreateButton type={'submit'} value={'Send'}/>
    </CreateMessageContainer>
}