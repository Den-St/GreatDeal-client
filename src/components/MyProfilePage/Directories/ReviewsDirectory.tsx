import { Col, Row, Skeleton, Space, Spin, Tag, Typography } from "antd"
import {StarFilled} from "@ant-design/icons";
import { defaultAvatar } from "../../../consts/defaultAvatar"
import { UserI } from "../../../types/user.type"
import { Avatar } from "../../ChatRoom/styles";
import { ItemContainer, ItemsContainer, Rate, ReviewCreatorName, ReviewText } from "../styles"
import { Display } from "../../../assets/Display";

type Props = {
    reviews:{review:string,creator:UserI,rate:number,id:string}[],
    loading:boolean
}

export const ReviewsDirectory:React.FC<Props> = ({reviews,loading}) => {
    return <ItemsContainer>
        {!loading ? reviews.map(review => 
            <Space key={review.id} style={{'background':'#2f3035','padding':'5px'}} direction="vertical">
                <Space align="start" >
                    <Avatar src={review.creator.photoURL || defaultAvatar}/>
                    <ReviewCreatorName to={'/user/'+review.creator.id}>{review.creator.displayName || `user` + review.creator.id}</ReviewCreatorName>
                    <Rate>{review.rate} <StarFilled /></Rate>
                </Space>
                <ReviewText>{review.review}</ReviewText>
            </Space>
        ) : <Display height="100%" width="100%" justify="center" align="center"><Spin/></Display>}
        {!loading && !reviews.length && <Tag style={{'fontSize':"30px","padding":"15px",textAlign:'center'}}>No reviews</Tag>}
    </ItemsContainer> 
}