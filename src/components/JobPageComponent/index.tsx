import { useJobPage } from "../../hooks/jobPage.hook";
import { Avatar, Container, CreatorName, Description, InfoContainer, Reward, Title } from "./styles";
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { LatLng } from "leaflet";
import { getCategoryIcon } from "../../helpers/getCategoryIcon";
import 'leaflet/dist/leaflet.css';
import { useSendJobRequest } from "../../hooks/jobPopup.hook";
import { Button, Carousel,Dropdown,Image, MenuProps, Row, Space, Spin, Tag } from "antd";
import { CategoryIcon } from "../JobSearch/styles";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { Display } from "../../assets/Display";
import { useEffect, useState } from "react";
import { ReportForm } from "../ReportForm";
import {ArrowLeftOutlined,MoreOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom";

export const JobPageComponent = () => {
    const {job,jobLoading} = useJobPage();
    const {onSendJobRequest,alreadyHave,loadingAlreadyHave,userId} = useSendJobRequest(job);
    const [isOnReport,setIsOnReport] = useState(false);
    const menu: MenuProps['items'] = [
        {
          label: <Button onClick={() => setIsOnReport(true)} danger>Report</Button>,
          key: '0',
        },
    ];
    useEffect(() => {
        document.title = job?.title + ' - GreatDeal';
    },[job?.title]);
    
    if(jobLoading) return <Container>
            <Display justify="center" align="center" width="100%" height="100%">
                <Spin/>
            </Display>
        </Container>

    if(isOnReport && job?.creator?.id) return <ReportForm leave={() => setIsOnReport(false)} suspect={job.creator.id} job={job.id}/>

    return <Container>
        <Display width="100%" padding="10px" align="center" justify="space-between">
            <Link style={{'color':'white',fontSize:'20px'}} to={'/'}><ArrowLeftOutlined /></Link>
            <Dropdown menu={{items: menu}} trigger={['click']}><Button style={{'fontSize':'20px','border':'none',padding:'none'}} ghost type={'dashed'}><MoreOutlined /></Button></Dropdown>
        </Display>
        {job?.images && <Carousel>
            {job.images.map(image => 
                <Image src={image} preview={{src:image}}/>
            )}
        </Carousel>}
        <InfoContainer>
            <Row style={{'padding':'4px'}} justify={'space-between'}>
            <Space>
                <CategoryIcon src={job?.category?.iconUrl}/>
                <span>{job?.category?.name}</span>
            </Space>
            <Space>
            <Reward>{job?.reward}</Reward>
            {userId === job?.creator?.id 
                    ? <Tag color={'gray'}>you are creator</Tag> 
                    : alreadyHave ? <Tag color={'gray'} >already applied</Tag> 
                    : <Button loading={loadingAlreadyHave} onClick={() => onSendJobRequest(job)} type={'primary'}>Send</Button>}
            </Space>
            </Row>
            <Title>
                {job?.title}
            </Title>
            <Description>
                {job?.description}
            </Description>
            <Space direction={'vertical'}>
                <span>Creator: </span>
            <Space>
                <Avatar src={job?.creator?.photoURL || defaultAvatar}/>
                <CreatorName to={'/user/'+job?.creator?.id}>{job?.creator?.displayName || 'user ' + job?.creator?.id}</CreatorName>
            </Space>
            </Space>
        </InfoContainer>
        <MapContainer center={new LatLng(job?.location._lat || 0, job?.location._long || 0)} zoom={15} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {job?.category?.iconUrl && <Marker icon={getCategoryIcon(job?.category?.iconUrl)} position={new LatLng(job?.location._lat || 0, job?.location._long || 0)}/>}
        </MapContainer>
    </Container>
}