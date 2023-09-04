import { useAppSelector } from './redux';
import { useCallback, useEffect, useState } from "react";
import { JobT } from "../types/job.type";
import _debounce from 'lodash/debounce';
import { CategoryT } from "../types/category.type";
import { getJobsByFilters } from "../firebase/db/jobs/get/getJobsByFilters";
import { LocationT } from '../types/location.type';

export const useSearchJobs = (setJobs:(jobs:JobT[]) => void) => {
  // const [jobs,setJobs] = useState<JobT[]>([]);
  const [jobsLoading,setJobsLoading] = useState(true);
  const [category,setCategory] = useState<CategoryT | null>(null);
  const [rewardMin,setRewardMin] = useState(0);
  const [title,setTitle] = useState('');
  const [isNearJob,setIsNear] = useState(true);
  const userLocation = useAppSelector(state => state.user.lastLocation);

  const search = async (value?: string,_category?:CategoryT | null,rewardMin?:number,_isNearJob?:boolean,userLocation?:LocationT | null) => {
    setJobsLoading(true);
    setTitle(value || '');
    try{
    if(!userLocation) return;

        const res = await getJobsByFilters({title:value || '',category:_category,rewardMin,isNearJob:_isNearJob},userLocation);
        setJobs(res as JobT[]);
    }catch(err){
        console.error(err);
    }
    setJobsLoading(false);
  }

  const onChangeCategory = (categoryStringified:string) => {
    setCategory(JSON.parse(categoryStringified) as CategoryT);
    debounceSearchJobs(title,JSON.parse(categoryStringified) as CategoryT,rewardMin,isNearJob,userLocation);
  }
  const onClearCategory = () => {
    setCategory(null);
    setTitle('');
    setJobs([]);
    setRewardMin(0);
    setIsNear(true);
    debounceSearchJobs('',null,0,true,userLocation);
  }
  console.log(rewardMin)
  const onChangeRewardMin = (e:React.ChangeEvent<HTMLInputElement>) => {
    setRewardMin(+e.target.value);
    debounceSearchJobs(title,category,+e.target.value,isNearJob,userLocation);
  }
  const onChangeTitle = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    debounceSearchJobs(e.target.value,category,rewardMin,isNearJob,userLocation);
  }
  const onChangeNearJob = (val:boolean) => {
    setIsNear(prev => !prev);
    debounceSearchJobs(title,category,rewardMin,val,userLocation);
  }
  const debounceSearchJobs = useCallback(_debounce(search, 400), []);

  useEffect(() => {
    debounceSearchJobs(title,category,rewardMin,isNearJob,userLocation);
  },[userLocation]);

  return {debounceSearchJobs,onChangeCategory,category,jobsLoading,title,rewardMin,
          onChangeRewardMin,onClearCategory,onChangeTitle,onChangeNearJob,isNearJob};
}