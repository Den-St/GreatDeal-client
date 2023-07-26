import { getNearJobs } from '../firebase/db/jobs/get/getNearJobs';
import { useEffect, useState } from "react";
import { JobT } from "../types/job.type";
import { LatLngBounds } from 'leaflet';

export const usePrintNearJobs = () => {
  const [jobs,setJobs] = useState<JobT[]>([]);
  const [jobsLoading,setLoading] = useState(true);
  const [mapBounds,setMapBounds] = useState<LatLngBounds | null>(null);
  const [zoom,setZoom] = useState<number>(13);
  
  console.log(zoom);
  const fetch = async () => {
    if(!mapBounds) return
    try{
        if(!mapBounds) setLoading(true);
        if(zoom >= 13) {
          const res = await getNearJobs(mapBounds) as JobT[];
          if(!res) return;
          setJobs(res);
        }
        setLoading(false);
    }catch(err){
        console.error(err);
    }
  }
  useEffect(() => {
    fetch();
  },[mapBounds]);

  return {jobs,jobsLoading,setMapBounds,setZoom};
}