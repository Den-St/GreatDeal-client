import { Display } from "../../assets/Display"
import {NotificationOutlined,CloseOutlined} from '@ant-design/icons';
import { Button, Radio, Spin, Typography } from "antd";
import styled from "styled-components";
import TextArea from "antd/es/input/TextArea";
import { useReport } from "../../hooks/report.hook";
import { useEffect } from "react";
import { Media } from "../../assets/breakpoints";
const { Title,Paragraph,Text } = Typography;

const Container = styled.div`
    display:flex;
    color:white;
    height:100vh;
    ${Media.down.m}{
        height:100svh;
    }
    background:rgb(19,21,27);
    flex-direction:column;
    padding:10px 20px;
    box-sizing:border-box;
    gap:20px;   
    .ant-radio-wrapper .ant-radio-checked .ant-radio-inner{
        background:transparent;
        border:1px solid white;
        font-weight:light;
    }
    h1{
        font-size:21px;
    }
    .ant-typography{
        color:white;
        margin:0;
        font-weight:300;
        font-size:17px;
    }
    textarea{
        height:100px;
    }
    .ant-btn-primary{
        font-size:20px;
        height:unset;
    }
    .ant-radio-wrapper .ant-radio-inner{
        background-color:transparent;
    }
`;

type Props = {
    suspect:string,
    chat?:string,
    job?:string,
    leave:() => void
}

export const ReportForm:React.FC<Props> = ({suspect,job,chat,leave}) => {
    const {reportCategories,loading,onReport,pickedCategory,setPickedCategory,setComment,comment,success} = useReport(suspect,job,chat); 

    useEffect(() => {
        if(success) leave();
    },[success]);

    return <Container >
        <Display width="100%"  color="white" height="40px" align="center" fontSize="25px"><CloseOutlined onClick={leave}/></Display>
        <Display fontSize="25px" width="100%" justify="center"><NotificationOutlined /></Display>
        <Typography color="white">Help us know, what happened:</Typography>
            <Radio.Group onChange={(e) => setPickedCategory(e.target.value)} value={pickedCategory}>
                {!loading.reportCategories ? <Display direction="column" gap="10px">
                    {reportCategories?.map(category => 
                        <Display key={category.id}>
                            <Radio value={category}/>
                            <Display direction="column">
                                <Title color="white">{category.name}</Title>
                                <Paragraph>{category.description}</Paragraph>
                            </Display>
                        </Display>    
                    )}
                </Display> : <Display width="100%" height="215.5px" align="center" justify="center"><Spin/></Display>}
            </Radio.Group>
            <Display direction="column" gap={'5px'}>
                <Text>Describe problem in details: </Text>
                <TextArea value={comment} onChange={(e) => setComment(e.target.value)}/>
            </Display>
            <Display width="100%" justify="center"><Button style={{'padding':'5px 15px'}} onClick={onReport} type={'primary'}>Send</Button></Display>
    </Container>
}