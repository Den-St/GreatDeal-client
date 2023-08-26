import { Button, Checkbox, Collapse, Input, Select, Skeleton, Spin, Tag } from 'antd'
import { Display } from '../../assets/Display';
import { useSearchCategories } from '../../hooks/searchCategories.hook';
import { useSearchJobs } from '../../hooks/searchJobs.hook';
import { CategoryContainer, InputBlock, InputHeader } from '../CreateJob/Form/styles';
import { CategoryIcon, Container, JobItemContainer, JobReward, JobsContainer, JobTitle, OpenFiltersButton, Wrapper } from './styles'
const {Option} = Select;

export const JobSearch = () => {
  const {onChangeCategory,jobs,category,jobsLoading,onChangeRewardMin,rewardMin,
        onClearCategory,onChangeTitle,isNearJob,onChangeNearJob,title} = useSearchJobs();
  const {debounceSearchCategories,categories,categoriesLoading} = useSearchCategories();
  
  return <Container>
    <Display padding='5px' background='rgb(19,21,27)' direction='column'>
        <Display align='center' gap='20px' >
          <Input style={{'width':'200px'}} placeholder='Title' color='rgb(19,21,27)' value={title} onChange={onChangeTitle}/>
            <Display align='center' gap='10px'>
              <Checkbox checked={isNearJob}  onChange={(e) => onChangeNearJob(e.target.checked)}/>
              Near me
            </Display>
        </Display>
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

    <JobsContainer>
        {!jobsLoading ? !!jobs?.length ? jobs?.map(job => 
        <JobItemContainer key={job?.id}>
            <CategoryIcon src={job.category?.iconUrl}/>
            <JobTitle to={`/job/${job?.id}`}>{job?.title}</JobTitle>
            <JobReward>{job.reward}</JobReward>
        </JobItemContainer>) : <Tag style={{'fontSize':"30px","padding":"15px",textAlign:'center'}}>No jobs</Tag> : <Spin/>}
    </JobsContainer>
  </Container>
}
