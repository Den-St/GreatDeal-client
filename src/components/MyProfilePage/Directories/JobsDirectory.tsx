import { Button, Skeleton, Space, Spin, Tag } from "antd";
import { Display } from "../../../assets/Display";
import { useJobStatusController } from "../../../hooks/jobStatusController.hook"
import { JobStatusT, JobT } from "../../../types/job.type"
import { CategoryIcon } from "../../JobSearch/styles";
import { ItemContainer, ItemsContainer, JobReward, JobTitle } from "../styles"

type Props = {
    jobsLoading:boolean,
    jobs:JobT[];
    refetch:() => Promise<void>;
}

export const JobsDirectory:React.FC<Props> = ({jobs,jobsLoading,refetch}) => {
    const {onChangeJobStatus} = useJobStatusController(refetch);
   console.log(jobs)
    return <ItemsContainer>
    {!jobsLoading 
    ? jobs.map(job => 
    <Space style={{'background':'#2f3035'}} key={job.id} size={'small'} direction='vertical'>
        <ItemContainer >
            <CategoryIcon src={job.category?.iconUrl}/>
            <JobTitle to={'/job/' + job.id}>{job.title}fasdfbbbbbb</JobTitle>
            <JobReward>{job.reward}</JobReward>
        </ItemContainer>
        <Space>
            {job?.createdAt?.toDate().toLocaleDateString() + ' ' + job?.createdAt?.toDate().toLocaleTimeString()}
            {job.status === 'not in work' && <Button danger onClick={() => {onChangeJobStatus(job,'deactivated');job.status = 'deactivated'}}>deactivate</Button>}
            {job.status === 'deactivated' && <Button type={'primary'} onClick={() => onChangeJobStatus(job,'not in work')}>activate</Button>}
            {job.status === 'in work' && <Tag color={'processing'}>in work</Tag>}
        </Space>
    </Space>)
    : <Display height="100%" width="100%" justify="center" align="center"><Spin/></Display>}
    {!jobsLoading && !jobs.length && <Tag style={{'fontSize':"30px","padding":"15px",textAlign:'center'}}>No jobs</Tag>}
</ItemsContainer>
}