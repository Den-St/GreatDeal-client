import { Avatar, Button, Collapse, Input, Radio, Select, Spin, Tag } from "antd"
import { Display } from "../../../assets/Display"
import { useReportCategories } from "../../hooks/reportCategories.hook";
import { Typography } from "antd";
import styled from "styled-components";
import { useState } from "react";
import { useSearchUserReports } from "../../hooks/userReports";
import { defaultAvatar } from "../../../consts/defaultAvatar";
import { Link } from "react-router-dom";
import { UserName } from "./styles";
import { Media } from "../../../assets/breakpoints";
import { wrappedAdminRoutes } from "../../routes";
import { wrappedRoutes } from "../../../consts/routes";
const {Option} = Select;
const {Panel} = Collapse;
const {Text} = Typography;

const Container = styled.div`
    display:flex;
    color:white;
    width:100%;
    height:100vh;
    flex-direction:column;
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
        font-size:15px;
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
    ${Media.down.m}{
        height:100svh;
    }
`;

export const UserReports = () => {
    const {categories,categoriesLoading,pickedCategories,setPickedCategory} = useReportCategories('user');
    const [statuses,setStatuses] = useState<string[]>(['not under investigation']);
    const [creatorId,setCreatorId] = useState('');
    const [suspectId,setSuspectId] = useState('');
    const {searchReports,reports,reportsLoading} = useSearchUserReports();
    console.log(reports);

    return <Container >
        <Display width="300px" direction="column" gap={'5px'}>
            <Input onChange={(e) => setCreatorId(e.target.value)} placeholder="Creator id"/>
            <Input onChange={(e) => setSuspectId(e.target.value)} placeholder="Suspect id"/>
            <Button type={'primary'} onClick={() => searchReports({categoryIds:pickedCategories,creatorId,suspectId,statuses})}>Search</Button>
        </Display>
        <Display width="180px">
            {!categoriesLoading ? 
                <Select 
                placeholder={'Category'}
                style={{'width':'100%'}} 
                mode='multiple'
                onChange={setPickedCategory} 
                value={pickedCategories}>
                    {categories.map(category => 
                        <Option key={category.id} value={category.id}>{category.name}</Option>
                    )}
                </Select>
                : <Display width="100%" align="center" justify="center"><Spin/></Display>}
        </Display>
        <Display width="220px">
            <Select 
            style={{'width':'100%'}} 
            mode='multiple'
            onChange={setStatuses}
            value={statuses}
            options={[
                {value:'under investigation',label:'under investigation'},
                {value:'not under investigation',label:'not under investigation'},
                {value:'done',label:'done'}
            ]}/>
        </Display>
        <Display direction="column" gap={'10px'} width={'80%'}>
            {!reportsLoading 
                ? reports.map(report => 
                    <Link to={wrappedAdminRoutes.userReport.replace(":id",report.id)} style={{color:'white',textDecoration:'none'}}>
                    <Display padding="10px 5px" background="#1b1f28ae" direction="column" gap="7px" key={report.id} >
                        <Display justify="space-between" gap={'10px'}>
                            <Display direction="column" gap={'5px'}>
                                <Display align="center" gap='5px'>
                                    Creator: 
                                    <Avatar src={report.creator.photoURL || defaultAvatar}/>
                                    {!!report.creator.id && <UserName to={wrappedRoutes.user.replace(":id",report.creator.id)}>{'user ' + report.creator.id}</UserName>}
                                </Display>
                                <Display align="center" gap='5px'>
                                    Suspect: 
                                    <Avatar src={report.suspect.photoURL || defaultAvatar}/>
                                    {!!report.suspect.id && <UserName to={wrappedRoutes.user.replace(":id",report.suspect.id)}>{'user ' + report.suspect.id}</UserName>}
                                </Display>
                            </Display>
                            <Display padding="5px" gap={'5px'} align={'center'} height={'30px'}>
                                Category: 
                                <Text style={{'margin':0,'lineHeight':1}}>{report.category.name}</Text>
                            </Display>
                            <Display direction="column" gap={'5px'}>
                                {report.status === 'not under investigation' && <Tag color={'gray'}>not under investigation</Tag>}
                                {report.status === 'under investigation' && <Tag color={'processing'}>under investigation</Tag>}
                                {report.status === 'done' && <Tag color={'success'}>done</Tag>}
                                {report.createdAt.toDate().toLocaleDateString() + ' ' + report.createdAt.toDate().toLocaleTimeString()}
                            </Display>
                        </Display>
                        <Text>{report.comment}</Text>
                    </Display>
                    </Link>)
                : <Display width="100%" align="center" justify="center"><Spin/></Display>}
        </Display>
    </Container>
}