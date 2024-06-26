import { Col, Empty, Row, Skeleton, Space, Spin, Tag, Typography } from "antd"
import {StarFilled} from "@ant-design/icons";
import { defaultAvatar } from "../../../consts/defaultAvatar"
import { UserI } from "../../../types/user.type"
import { Avatar } from "../../ChatRoom/styles";
import { ItemContainer, ItemsContainer, Rate, ReviewCreatorName, ReviewText } from "../styles"
import { Display } from "../../../assets/Display";
import { wrappedRoutes } from "../../../consts/routes";

type Props = {
    reviews:{review:string,creator:UserI,rate:number,id:string}[],
    loading:boolean
}

export const ReviewsDirectory:React.FC<Props> = ({reviews,loading}) => {
    return <ItemsContainer>
        {!loading ? reviews.map(review => 
            <Display key={review.id} background={'#2f3035'} padding={'5px'} direction="column">
                <Space align="start" >
                    <Avatar src={review.creator.photoURL || defaultAvatar}/>
                    {!!review.creator.id && <ReviewCreatorName to={wrappedRoutes.user.replace(":id",review.creator.id)}>{review.creator.displayName || `user ` + review.creator.id}</ReviewCreatorName>}
                    <Rate>{review.rate} <StarFilled /></Rate>
                </Space>
                <ReviewText>{review.review}</ReviewText>
            </Display>
        ) : <Display height="100%" width="100%" justify="center" align="center"><Spin/></Display>}
        {!loading && !reviews.length && <Empty description={'No reviews'} image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    </ItemsContainer> 
}