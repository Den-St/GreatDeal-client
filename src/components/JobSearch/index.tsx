import { Button, Checkbox, Collapse, Input, Modal, Select, Skeleton, Spin, Tag } from 'antd'
import { useEffect, useState } from 'react';
import { Display } from '../../assets/Display';
import { wrappedRoutes } from '../../consts/routes';
import { useSearchCategories } from '../../hooks/searchCategories.hook';
import { useSearchJobs } from '../../hooks/searchJobs.hook';
import { JobT } from '../../types/job.type';
import { CategoryContainer, InputBlock, InputHeader } from '../CreateJob/Form/styles';
import { CategoryIcon, Container, JobItemContainer, JobReward, JobsContainer, JobTitle, OpenFiltersButton, Wrapper } from './styles'
const {Option} = Select;

export const JobSearch = () => {
  const [filterOpened, setFilterOpened] = useState(false);
  const [jobs,setJobs] = useState<JobT[]>([]);
  const {onChangeCategory,category,jobsLoading,onChangeRewardMin,rewardMin,
        onClearCategory,onChangeTitle,isNearJob,onChangeNearJob,title} = useSearchJobs(setJobs);
  const {debounceSearchCategories,categories,categoriesLoading} = useSearchCategories();
  const closeFilter = () => setFilterOpened(false);
  
  useEffect(() => {
    document.title = 'Job search - GreatDeal';
  },[]);

  return <Container>
    <Display align='center' gap='20px' >
      <Input style={{'width':'200px'}} placeholder='Title' color='rgb(19,21,27)' value={title} onChange={onChangeTitle}/>
      <Display align='center' gap='10px'>
        <Checkbox checked={isNearJob}  onChange={(e) => onChangeNearJob(e.target.checked)}/>
        Near me
      </Display>
    </Display>
    <Button onClick={() => setFilterOpened((prev) => !prev)}>Show Filter</Button>
    {/* <Filter setJobs={setJobs} isShown={filterOpened} closeFilter={closeFilter} /> */}
    <Modal okButtonProps={{'hidden':true}} onCancel={closeFilter}
        cancelButtonProps={{ 'hidden':true }} open={filterOpened} >
    <Display padding='5px' background='rgb(47,48,53)' direction='column' gap={'10px'}>
        <InputBlock>
        <InputHeader>Category:</InputHeader>
        <Select
          placeholder={"Category"}
          value={category === null ? '' : JSON.stringify(category)}
          onChange={onChangeCategory}
          className="select"
          loading={categoriesLoading}
          onSearch={debounceSearchCategories}
          showSearch
          clearIcon={true}
          >
          {categories && categories.map(category => 
              <Option key={category.id} value={JSON.stringify(category)}>
                  <CategoryContainer>
                    <CategoryIcon src={category.iconUrl.replace('FFFFFF',"000000")}/>
                    {category.name}
                  </CategoryContainer>
              </Option>
          )}
        </Select>
      </InputBlock>
      <Display direction='column' gap='5px' style={{'width':'55%'}}>
        <InputHeader>Reward minimum:</InputHeader>
        <Input type='number' value={rewardMin} onChange={onChangeRewardMin}/>
      </Display>
      <Button danger onClick={onClearCategory}>clear</Button>
    </Display>
  </Modal>
    <JobsContainer>
        {!jobsLoading ? !!jobs?.length ? jobs?.map(job => 
        <JobItemContainer key={job?.id}>
            <CategoryIcon src={job.category?.iconUrl}/>
            <JobTitle to={wrappedRoutes.job.replace(":id",job.id)}>{job?.title}</JobTitle>
            <JobReward>{job.reward}</JobReward>
        </JobItemContainer>) : <Tag style={{'fontSize':"30px","padding":"15px",textAlign:'center',color:'white'}}>No jobs</Tag> : <Display width='100%' height='100%' justify='center' align='center'><Spin/></Display>}
    </JobsContainer>
  </Container>
}

const Filter: React.FC<{isShown?: boolean; closeFilter: () => void,setJobs:(jobs:JobT[]) => void}> = ({isShown, closeFilter,setJobs}) => {
  const {onChangeCategory,category,jobsLoading,onChangeRewardMin,rewardMin,
    onClearCategory,onChangeTitle,isNearJob,onChangeNearJob,title} = useSearchJobs(setJobs);

  const {debounceSearchCategories,categories,categoriesLoading} = useSearchCategories();

  return <Modal open={isShown} onCancel={closeFilter} onOk={closeFilter}>
    <Display padding='5px' background='rgb(19,21,27)' direction='column'>
        
        <InputBlock>
        <InputHeader>Category:</InputHeader>
        <Select
          placeholder={"Category"}
          style={{'width':'50%'}}
          value={category === null ? '' : JSON.stringify(category)}
          onChange={onChangeCategory}
          className="select"
          loading={categoriesLoading}
          onSearch={debounceSearchCategories}
          showSearch
          clearIcon={true}
          >
          {categories && categories.map(category => 
              <Option key={category.id} value={JSON.stringify(category)}>
                  <CategoryContainer>
                    <CategoryIcon src={category.iconUrl.replace('FFFFFF',"000000")}/>
                    {category.name}
                  </CategoryContainer>
              </Option>
          )}
        </Select>
      </InputBlock>
      <Display direction='column' gap='5px' style={{'width':'45%'}}>
        <InputHeader>Reward minimum:</InputHeader>
        <Input value={rewardMin} onChange={onChangeRewardMin}/>
      </Display>
      <Button danger onClick={onClearCategory}>clear</Button>
    </Display>
  </Modal>
}