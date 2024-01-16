import { useUserProfile } from "../../hooks/userProfile";
import { Container, UserInfoContainer, UserName, Reviews } from "./styles"
import {StarFilled} from "@ant-design/icons";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { Col, Divider, Empty, Row, Skeleton, Space, Spin, Statistic, Tag } from "antd";
import { Avatar } from "../ChatRoom/styles";
import { Rate, ReviewCreatorName, ReviewText } from "../MyProfilePage/styles";
import { useEffect } from "react";
import { wrappedRoutes } from "../../consts/routes";

export const UserProfile = () => {
    const {user,loading,stats,reviews} = useUserProfile();
    useEffect(() => {
        document.title = user?.displayName || 'User profile'
    },[]);
    
    return <Container>
        <UserInfoContainer>
            {!loading.user 
            ? <>
                <Avatar src={user?.photoURL || defaultAvatar}/>
                <UserName>{user?.displayName || 'user' + user?.id}</UserName>
            </> : <Spin/>}
        </UserInfoContainer>
        <Row justify={'space-around'}>
            <Col>
                <Statistic title="Rating" value={stats?.rating || '-'} suffix={!!stats?.rating && <StarFilled/>} loading={loading.stats}/>
            </Col>
            <Col >
                <Statistic title="Jobs" value={stats?.numberOfJobs} loading={loading.stats}/>
            </Col>
            <Col >
                <Statistic title="Fdsfsd" value={45} loading={loading.stats}/>
            </Col>
        </Row>
        <Divider/>
        <Reviews>
            {!loading.stats ? reviews.map(review => 
                <Space style={{'background':'#2f3035','padding':'5px'}} direction="vertical">
                    <Space align="start" >
                        <Avatar src={review.creator.photoURL || defaultAvatar}/>
                        {!!review.creator.id && <ReviewCreatorName to={wrappedRoutes.user.replace(':id',review.creator.id)}>{review.creator.displayName || `user` + review.creator.id}</ReviewCreatorName>}
                        <Rate>{review.rate} <StarFilled /></Rate>
                    </Space>
                    <ReviewText>{review.review}</ReviewText>
                </Space>
            ) : <Spin/>}
        </Reviews>
        {!loading.stats && !reviews.length && <Empty description={'No reviews'} image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    </Container>
}