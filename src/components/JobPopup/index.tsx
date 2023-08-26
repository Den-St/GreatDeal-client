import { Button, Skeleton, Tag } from "antd";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { useSendJobRequest } from "../../hooks/jobPopup.hook";
import { JobT } from "../../types/job.type"
import { ApplyButton, Avatar, BottomContainer, Container, Creator, CreatorName, Reward, Title } from "./styles";

type Props = {
    job:JobT;
}

export const JobPopup:React.FC<Props> = ({job}) => {
    const {onSendJobRequest,alreadyHave,loadingAlreadyHave,userId} = useSendJobRequest(job);

    return <Container>
        <Creator>
            <Avatar src={job.creator?.photoURL || defaultAvatar}/>
            <CreatorName to={'/user/'+job.creator?.id}>{job.creator?.displayName || `user ` + job.creator?.id}</CreatorName>
        </Creator>
        <Title to={'/job/'+job.id}>
            {job.title}
        </Title>
        <BottomContainer>
            <Reward>{job.reward}</Reward>
            {!loadingAlreadyHave ?
            <>
                {userId === job.creator?.id 
                ? <Tag color={'gray'}>you are creator</Tag>
                : alreadyHave ? <Tag color={'gray'}>already aplied</Tag> : <Button onClick={() => onSendJobRequest(job)} type={'primary'}>Send</Button>}
            </>
             : <Skeleton/>}
        </BottomContainer>
    </Container>
}