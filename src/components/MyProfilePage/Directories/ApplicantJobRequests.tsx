import { Button, Empty, Skeleton, Spin, Tag } from 'antd'
import {CheckOutlined} from "@ant-design/icons";
import React from 'react'
import { Display } from '../../../assets/Display'
import { deleteJobRequestById } from '../../../firebase/db/jobRequests/delete/deleteJobRequestById'
import { JobRequestT } from '../../../types/jobRequest.type'
import { CategoryIcon } from '../../JobSearch/styles'
import { ItemsContainer,ItemContainer, JobTitle, Approved, Rejected } from '../styles'
import { wrappedRoutes } from '../../../consts/routes';

type Props = {
    applicantJobRequestsLoading:boolean;
    applicantJobRequests:JobRequestT[];
    refetch:() => Promise<void>;
}

export const ApplicantJobRequests:React.FC<Props> = ({applicantJobRequests,applicantJobRequestsLoading,refetch}) => {
  const onDeleteJob = (id:string) => {
    deleteJobRequestById(id);
    refetch();
  }
  return <ItemsContainer>
  {!applicantJobRequestsLoading 
    ? applicantJobRequests.map(req => <ItemContainer key={req.id}>
      <CategoryIcon src={req.job?.category?.iconUrl}/>
      <JobTitle to={wrappedRoutes.job.replace(":id",req.job.id)}>{req.job.title}</JobTitle>
      {req.status === 'active' && <Button danger onClick={() => onDeleteJob(req.id)}>cancel</Button>}
      {req.status === 'rejected' && <Display height='100%' align='center'><Tag style={{'fontSize':'16px','padding':'5px','height':'fit-content'}} color="error">Rejected</Tag></Display>}
      {req.status === 'approved' && <Display height='100%' align='center'><Tag style={{'fontSize':'16px','padding':'5px','height':'fit-content'}} icon={<CheckOutlined/>} color="success">Approved</Tag></Display>}
      </ItemContainer>)
    : <Display height="100%" width="100%" justify="center" align="center"><Spin/></Display>}
      {!applicantJobRequestsLoading && !applicantJobRequests.length && <Empty description={'No requests'} image={Empty.PRESENTED_IMAGE_SIMPLE} />}
  </ItemsContainer>
}
