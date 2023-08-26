import React from 'react'
import { MessageT } from '../../types/message.type';
import { CreatedAt, MessageText, YourMessageContainer } from './styles'
import {Image} from "antd";

type Props = {
    message:MessageT;
}

export const YourMessage:React.FC<Props> = ({message}) => {
  return <YourMessageContainer>
    <MessageText>
      {message.text}
    </MessageText>
    {message.images?.map(image => 
      <Image
        src={image}
        preview={{
            src: image,
            }}
      />)}
    <CreatedAt>
      {message.createdAt.toDate().toLocaleDateString() + ' ' + message.createdAt.toDate().toLocaleTimeString()}
    </CreatedAt>
  </YourMessageContainer>
}
