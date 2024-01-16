import { Button, Empty, Skeleton, Space, Spin, Tag } from 'antd'
import {CheckOutlined} from "@ant-design/icons";
import React from 'react'
import { Display } from '../../../assets/Display'
import { defaultAvatar } from '../../../consts/defaultAvatar'
import { useRequestStatusController } from '../../../hooks/requestStatusController'
import { JobRequestT } from '../../../types/jobRequest.type'
import { Avatar } from '../../ChatRoom/styles'
import { CategoryIcon } from '../../JobSearch/styles'
import { ItemContainer, ItemsContainer, JobTitle, UserContainer, UserName } from '../styles'
import { wrappedRoutes } from '../../../consts/routes';
type Props = {
    creatorJobRequestsLoading:boolean,
    creatorJobRequests:JobRequestT[],
    refetch:() => Promise<void>
}

export const CreatorJobRequests:React.FC<Props> = ({creatorJobRequests,creatorJobRequestsLoading,refetch}) => {
  const {onChangeRequestStatus} = useRequestStatusController(refetch);
  return <ItemsContainer>
  {!creatorJobRequestsLoading 
  ? creatorJobRequests.map(req => 
  <ItemContainer key={req.id}>
    <Space  direction={'vertical'}>
      <UserContainer>
        <Avatar src={req.applicant.photoURL || defaultAvatar}/>
        <UserName>{req.applicant.displayName || `user`+req.applicant.id}</UserName>
      </UserContainer>
      <Space>
        <CategoryIcon src={req.job.category?.iconUrl}/>
        <JobTitle to={wrappedRoutes.job.replace(":id",req.job.id)}>{req.job.title}</JobTitle>
      </Space>
    </Space>
    {req.status === 'active' ? <Display direction='column' gap={'10px'} padding={'10px 0px'}>
      <Button type='primary' onClick={() => onChangeRequestStatus(req,'approved')}>approve</Button>
      <Button danger onClick={() => onChangeRequestStatus(req,'rejected')}>reject</Button>
    </Display> : <Display height='100%' align='center'><Tag style={{'fontSize':'15px','padding':'3px','boxSizing':'border-box','height':'fit-content'}} icon={<CheckOutlined/>} color="success">Approved</Tag></Display>}
  </ItemContainer>)
  : <Display height="100%" width="100%" justify="center" align="center"><Spin/></Display>}
    {!creatorJobRequestsLoading && !creatorJobRequests.length && <Empty description={'No requests'} image={Empty.PRESENTED_IMAGE_SIMPLE} />}
</ItemsContainer>
}
