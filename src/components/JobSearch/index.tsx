import { Input, Select } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useSearchCategories } from '../../hooks/searchCategories.hook';
import { useSearchJobs } from '../../hooks/searchJobs.hook';
import { Container, FiltersContainer, JobItemContainer, JobsContainer, OpenFiltersButton, Wrapper } from './styles'
const {Option} = Select;

export const JobSearch = () => {
  const [opened,setOpened] = useState(false);

    const toggleFilters = () => {
        setOpened(prev => !prev);
    }
    const {onChangeCategory,jobs,category,jobsLoading,onChangeRewardMin,onClearCategory,onChangeTitle} = useSearchJobs();
    const {debounceSearchCategories,categories,categoriesLoading} = useSearchCategories();
  return <Container>
    <Wrapper>
    <Input onChange={onChangeTitle}/>
    <FiltersContainer $opened={opened}>
    <Select
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
                {category.name}
            </Option>
        )}
    </Select>
    <button onClick={onClearCategory}>clear</button>
    <Input onChange={onChangeRewardMin}/>
    </FiltersContainer>
    <OpenFiltersButton onClick={toggleFilters}>{opened ? `close` : 'open'}</OpenFiltersButton>
    <JobsContainer>
        {!jobsLoading ? !!jobs?.length ? jobs?.map(job => 
        <JobItemContainer key={job?.id}>
            <Link to={`/job/${job?.id}`}>{job?.title}</Link>
        </JobItemContainer>) : <h1>no data</h1> : <h1>Loading...</h1>}
    </JobsContainer>
    </Wrapper>
  </Container>
}
