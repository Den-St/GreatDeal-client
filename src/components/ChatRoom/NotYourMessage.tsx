import { MessageT } from "../../types/message.type"
import { NotYourMessageContainer,CreatedAt, MessageText } from "./styles"
import {Image} from "antd";

type Props = {
    message:MessageT;
}

export const NotYourMessage:React.FC<Props> = ({message}) => {
    return <NotYourMessageContainer>
        <MessageText>{message.text}</MessageText>
        {message.images?.map(image => <Image src={image} preview={{src:image}}/>)}
        <CreatedAt>
            {message.createdAt.toDate().toLocaleDateString() + ' ' + message.createdAt.toDate().toLocaleTimeString()}
        </CreatedAt>
    </NotYourMessageContainer>
}