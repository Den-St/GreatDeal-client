import { useCallback, useEffect, useState } from "react";
import { JobT } from "../types/job.type";
import _debounce from 'lodash/debounce';
import { CategoryT } from "../types/category.type";
import { getJobsByFilters } from "../firebase/db/jobs/get/getJobsByFilters";

export const useSearchJobs = () => {
  const [jobs,setJobs] = useState<JobT[]>([]);
  const [jobsLoading,setJobsLoading] = useState(true);
  const [category,setCategory] = useState<CategoryT | null>(null);
  const [rewardMin,setRewardMin] = useState(0);
  const [title,setTitle] = useState('');

  const search = async (value?: string,_category?:CategoryT | null,rewardMin?:number) => {
    setJobsLoading(true);
    setTitle(value || '');
    try{
        const res = await getJobsByFilters({title:value || '',category:_category,rewardMin});
        setJobs(res as JobT[]);
    }catch(err){
        console.error(err);
    }
    setJobsLoading(false);
  }
  const onChangeCategory = (categoryStringified:string) => {
    setCategory(JSON.parse(categoryStringified) as CategoryT);
    debounceSearchJobs(title,JSON.parse(categoryStringified) as CategoryT,rewardMin);
  }
  const onClearCategory = () => {
    setCategory(null);
    debounceSearchJobs(title,null,rewardMin);
  }
  const onChangeRewardMin = (e:React.ChangeEvent<HTMLInputElement>) => {
    setRewardMin(+e.target.value);
    debounceSearchJobs(title,category,+e.target.value,);
  }
  const onChangeTitle = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    debounceSearchJobs(e.target.value,category,rewardMin);
  }
  useEffect(() => {
    debounceSearchJobs();
  },[]);
  const debounceSearchJobs = useCallback(_debounce(search, 400), []);

  return {debounceSearchJobs,onChangeCategory,jobs,category,jobsLoading,onChangeRewardMin,onClearCategory,rewardMin,onChangeTitle};
}