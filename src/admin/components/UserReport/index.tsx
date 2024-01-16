import { Avatar,Button,Image,Radio,Spin,Tag,Typography} from "antd"
import {WarningOutlined,MinusCircleOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { styled } from "styled-components";
import { Display } from "../../../assets/Display"
import { defaultAvatar } from "../../../consts/defaultAvatar";
import { useReportResults } from "../../hooks/reportResults";
import { useUserReport } from "../../hooks/userReport";
import { UserName } from "../UserReports/styles"
import { reportStatuses } from "../../reportStatuses";
import { wrappedRoutes } from "../../../consts/routes";
const {Text} = Typography;

const Container = styled.div`
    .ant-typography{
        color:white;
        margin:0;
        line-height:normal;
    }
    .ant-radio-wrapper{
        color:white;
    }
    .ant-tag{
        text-align:center;
        width:fit-content;
    }
`;

export const UserReport = () => {
    const {loading,report,messages,onChangeReportStatus} = useUserReport();
    const {reportResults,reportResultsLoading,onCreateReportResult,setComment,comment,sentence,setSentence,innocence,setInnocence} = useReportResults();
    if(loading.report) return <Display width="500px" height="500px" align="center" justify="center"><Spin/></Display>
    console.log(reportResults);
    return <Container>
        <Display gap="5px" color={'white'} direction="column">
        <Display padding="10px 5px" background="#1b1f28ae" direction="column" gap="7px" width="735px">
            <Display justify="space-between" gap={'10px'}>
                <Display direction="column" gap={'5px'}>
                    <Display align="center" gap='5px'>
                        Creator: 
                        <Avatar src={report?.creator?.photoURL || defaultAvatar}/>
                        {!!report?.creator.id && <UserName to={wrappedRoutes.user.replace(':id',report?.creator.id)}>{'user ' + report?.creator.id}</UserName>}
                    </Display>
                    <Display align="center" gap='5px'>
                        Suspect: 
                        <Avatar src={report?.suspect?.photoURL || defaultAvatar}/>
                        {!!report?.suspect.id && <UserName to={wrappedRoutes.user.replace(':id',report?.suspect.id)}>{'user ' + report?.suspect.id}</UserName>}
                    </Display>
                </Display>
                <Display padding="5px" gap={'5px'}>
                    Category: 
                    <Text>{report?.category.name}</Text>
                </Display>
                <Display direction="column" gap={'5px'}>
                    {report?.status === reportStatuses.notUnder && <Tag color={'gray'}>not under investigation</Tag>}
                    {report?.status === reportStatuses.under && <Tag color={'processing'}>under investigation</Tag>}
                    {report?.status === reportStatuses.done && <Tag color={'success'}>done</Tag>}
                    {report?.createdAt.toDate().toLocaleDateString() + ' ' + report?.createdAt.toDate().toLocaleTimeString()}
                </Display>
            </Display>
            <Text>{report?.comment}</Text>
        </Display>
        <Display direction="column" gap="7px">
            {messages.map(message => 
                <Display gap={'5px'} direction={'column'} background="#1b1f28ae" key={message.id} padding={"10px"}>
                    <Display color="white" gap={'5px'}>
                        <Text>{message?.createdAt.toDate().toLocaleDateString() + ' ' + message?.createdAt.toDate().toLocaleTimeString()}</Text>
                        <Text>{message.sender.id === report?.creator.id ? 'creator' : 'suspect'}:</Text>
                        <Text>{message.text}</Text>
                    </Display>
                    <Display gap="3px" >
                        {message.images?.map(image => <Display  maxWidth="150px" maxHeight="150px"><Image src={image} preview={{src:image}}/></Display>)}
                    </Display>
                </Display>
            )}
        </Display>
        {report?.status !== reportStatuses.done && <Display width="240px" height="600px" background="#1b1f28ae" direction="column" padding="5px" position="fixed" right="140px" top={'15px'} gap={'5px'} style={{overflowY:'scroll'}}>
            {report?.status !== 'under investigation' 
                && <Button type="primary" onClick={() => onChangeReportStatus('under investigation')}>Start investigation</Button> }
            {report?.status !== reportStatuses.notUnder && 
            <><Radio.Group defaultValue={'innocent'} value={innocence} onChange={(e) => setInnocence(e.target.value)}>
                <Radio value={'innocent'}>Innocent</Radio>
                <Radio value={'guilty'}>Guilty</Radio>
            </Radio.Group>
            {/* <TextArea value={comment} onChange={(e) => setComment(e.target.value)}/> */}
            {innocence === 'guilty' && <Display gap={'5px'}>
                <Text>Sentence:</Text>
                <Radio.Group value={sentence} onChange={(e) => setSentence(e.target.value)} defaultValue={'warning'}>
                    <Radio value={'warning'}>Warning</Radio>
                    <Radio value={'ban'}>Ban</Radio>
                </Radio.Group>
            </Display>}
            <Button type={'default'} onClick={() => {
                onCreateReportResult({
                    comment,
                    sentence,
                    report:report?.id || '',
                    suspect:report?.suspect.id || ''
                });
                if(report) report.status = 'done';
            }}>Done</Button></>}
            <Display direction="column" gap={'5px'}>
                {!reportResultsLoading && reportResults.map(reportResult => 
                    <Display direction="column" padding="5px" gap={'5px'}>
                        <Tag icon={reportResult.sentence === 'warning' ? <WarningOutlined /> : <MinusCircleOutlined />}
                             color={reportResult.sentence === 'warning' ? 'warning' : 'error'}>{reportResult.sentence}</Tag>
                        <Display direction="column">
                            Suspect: 
                            <Display style={{'flexWrap':'wrap',width:'100%'}}>
                                <Avatar src={reportResult?.suspect?.photoURL || defaultAvatar}/>
                                {!!reportResult?.suspect.id && <UserName to={wrappedRoutes.user.replace(':id',reportResult?.suspect.id)}>{'user' + report?.suspect.id}</UserName>}
                            </Display>
                        </Display>
                        <Text>Comment: {reportResult.comment}</Text>
                    </Display>
                )}
            </Display>
        </Display>}
    </Display>
    </Container>
}