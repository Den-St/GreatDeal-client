import { useMyProfile } from "../../hooks/myProfile.hook";
import {UploadOutlined,StarFilled,LogoutOutlined} from "@ant-design/icons";
import { Avatar } from "../ChatRoom/styles";
import { ApplicantJobRequests } from "./Directories/ApplicantJobRequests";
import { CreatorJobRequests } from "./Directories/CreatorJobRequests";
import { JobsDirectory } from "./Directories/JobsDirectory";
import { Container, UserContainer, UserName } from "./styles";
import {EditOutlined,CheckOutlined,CloseOutlined} from '@ant-design/icons';
import { Button, Col, Input, Popconfirm, Row, Skeleton, Spin, Statistic, Tabs } from "antd";
import { useEditUserInfo } from "../../hooks/editUserInfo";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { PhotosInput, PhotosInputContainer } from "../CreateJob/Form/styles";
import { ReviewsDirectory } from "./Directories/ReviewsDirectory";
import { signOut } from "firebase/auth";
import { googleAuthProvider } from "../../firebase/firebaseInit";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Display } from "../../assets/Display";

export const MyProfilePage = () => {
    const {user,applicantJobRequests,jobs,loading,
           creatorJobRequests,setDir,dir,fetchCreatedJobs,reviews,stats,
           fetchYourJobRequestsByAplicant,fetchYourJobRequestsByCreator} = useMyProfile();

    const {onConfirmEditUserInfo,changeNameUserInfo,setIsEditingUserInfo,isEditingUserInfo,setNewImage,newImage,newUserInfo} = useEditUserInfo();
    const [logout,setLogout] = useState(false);
    
    const onImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setNewImage(e.target.files[0]);
        }
    }

    const onLogout = () => {
        signOut(googleAuthProvider).then(() => setLogout(true));

    }

    const directories = [
        {
            children:<ReviewsDirectory reviews={reviews} loading={loading.stats}/>,
            label:'Reviews',
            key:'0'
        },
        {
            children:<JobsDirectory refetch={fetchCreatedJobs} jobs={jobs} jobsLoading={loading.jobsLoading}/>,
            label:'Created jobs',
            key:'1'
        },
        {
            children:<ApplicantJobRequests refetch={fetchYourJobRequestsByAplicant} applicantJobRequests={applicantJobRequests} 
                       applicantJobRequestsLoading={loading.applicantJobRequestsLoading}/>,
            label:'Your requests',
            key:'2'
        },
        {
            children:<CreatorJobRequests refetch={fetchYourJobRequestsByCreator} creatorJobRequestsLoading={loading.creatorJobRequestsLoading}
                        creatorJobRequests={creatorJobRequests}/>,
            label:'Incoming requests',
            key:'3'
        },
    ];

    if(logout) return <Navigate to={'/registration'}/>
    return <Container>
        <UserContainer>
            {!loading.userLoading ?
            <>{!isEditingUserInfo 
            ? <>
                <Avatar src={newImage ? URL.createObjectURL(newImage) : user.photoURL || defaultAvatar}/> 
                <UserName>
                    {user?.displayName || ('user ' + user?.id)}
                </UserName>
                <Button type={'primary'} onClick={() => setIsEditingUserInfo(true)}><EditOutlined /></Button>
                <Popconfirm
                    title="Logout from account"
                    description="Are you sure to logout from account?"
                    onConfirm={onLogout}
                    okText="Yes"
                    cancelText="No">
                    <Button danger style={{'background':'#202024'}} ><LogoutOutlined /></Button>
                </Popconfirm>
              </>
            : <>
              <PhotosInputContainer>
                <UploadOutlined/>
                <PhotosInput type={'file'} onChange={onImageChange}/>
              </PhotosInputContainer>
              <Input defaultValue={user.displayName || ''} onChange={(e) => changeNameUserInfo(e.target.value)}/>
              <Button type="primary"  onClick={onConfirmEditUserInfo}>
                <CheckOutlined />
              </Button>
              <Button type={'dashed'} danger onClick={() => setIsEditingUserInfo(false)}>
                <CloseOutlined />
              </Button>
              </>}</>
              : <Display width="100%" justify="center"><Spin/></Display>}
        </UserContainer>
        <Row justify={'space-around'}>
                <Col>
                    <Statistic style={{color:'white'}} title="Rating" value={stats?.rating || '-'} suffix={!!stats?.rating && <StarFilled/>} loading={loading.stats}/>
                </Col>
                <Col >
                    <Statistic style={{color:'white'}} title="Jobs" value={stats?.numberOfJobs} loading={loading.stats}/>
                </Col>
                <Col >
                    <Statistic style={{color:'white'}} title="Fdsfsd" value={45} loading={loading.stats}/>
                </Col>
        </Row>
        <Tabs defaultActiveKey="0" items={directories} onChange={(key) => setDir(+key)} />
    </Container>
}