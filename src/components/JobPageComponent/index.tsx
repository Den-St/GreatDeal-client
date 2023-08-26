import { useJobPage } from "../../hooks/jobPage.hook";
import { Avatar, Container, CreatorContainer, CreatorName, Description, InfoContainer, Reward, Title } from "./styles";
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { LatLng } from "leaflet";
import { getCategoryIcon } from "../../helpers/getCategoryIcon";
import 'leaflet/dist/leaflet.css';
import { useSendJobRequest } from "../../hooks/jobPopup.hook";
import { Button, Carousel,Image, Row, Skeleton, Space, Spin, Tag } from "antd";
import { CategoryIcon } from "../JobSearch/styles";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { Display } from "../../assets/Display";

export const JobPageComponent = () => {
    const {job,jobLoading} = useJobPage();
    const {onSendJobRequest,alreadyHave,loadingAlreadyHave,userId} = useSendJobRequest(job);

    if(jobLoading) return <Container>
            <Display justify="center" align="center">
                <Spin/>
            </Display>
        </Container>

    return <Container>
        <Carousel >
            {job?.images?.map(image => 
                <Image src={image} preview={{src:image}}/>
            )}
        </Carousel>
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