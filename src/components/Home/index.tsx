import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { Container } from './styles'
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { getJobs } from '../../firebase/db/jobs/get/getJobs';
import { JobT } from '../../types/job.type';
import { MyLocationMarker } from '../MyLocationMarker';
import { UserLocationLoader } from '../../assets/UserLocationLoader';
import { Icon } from 'leaflet';
import MarkerClusterGroup from "react-leaflet-cluster";

export const HomeComponent = () => {
  const [userLocationLoading,setUserLocationLoading] = useState(true);
  const [jobs,setJobs] = useState<JobT[]>([]);
  const [jobsLoading,setLoading] = useState(true);
  useEffect(() => {
    getJobs().then(_jobs => setJobs(_jobs as JobT[]));
    setLoading(false);
  },[]);
  console.log("jobs",jobs.map(j => j.id));
  const getCategoryIcon = (url?:string) => {
    return new Icon({
      iconUrl:url,
      iconSize:[25,25]
    });
  }
    return <Container>
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userLocationLoading && <UserLocationLoader>Loading...</UserLocationLoader>}
        <MyLocationMarker  setUserLocationLoading={setUserLocationLoading}/>
        {!jobsLoading && <PrintJobs getCategoryIcon={getCategoryIcon} jobs={jobs}/>}
    </MapContainer>
  </Container>
}

const PrintJobs:React.FC<{jobs:JobT[],getCategoryIcon:(url?:string) => Icon<{ iconUrl: string | undefined; iconSize: [number, number]; }>}> = ({jobs,getCategoryIcon}) => {
    
    return <>
    <MarkerClusterGroup>
      {jobs.map(job => 
      !!job.id &&
      <Marker key={job.id} 
      icon={getCategoryIcon(job?.category?.iconUrl)} 
      position={{lat:job.location._lat,lng:job.location._long}} >
        <Popup key={job.id}>{job.description}</Popup>
      </Marker>)}
    </MarkerClusterGroup>
    </>

}