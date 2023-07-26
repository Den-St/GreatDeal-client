import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { Container } from './styles'
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { JobT } from '../../types/job.type';
import { MyLocationMarker } from '../MyLocationMarker';
import { UserLocationLoader } from '../../assets/UserLocationLoader';
import { Icon, LatLngBounds } from 'leaflet';
import MarkerClusterGroup from "react-leaflet-cluster";
import { usePrintNearJobs } from '../../hooks/printNearJobs.hook';
import { createJobRequest } from '../../firebase/db/jobRequests/create/createJobRequest';
import { useAppSelector } from '../../hooks/redux';

export const HomeComponent = () => {
  const [userLocationLoading,setUserLocationLoading] = useState(true);
  const {jobs,jobsLoading,setMapBounds,setZoom} = usePrintNearJobs();

  return <Container>
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userLocationLoading && <UserLocationLoader>Loading...</UserLocationLoader>}
        <MyLocationMarker setUserLocationLoading={setUserLocationLoading}/>
        <ChangeLocation setZoom={setZoom} userLocationLoading={userLocationLoading} setMapBounds={setMapBounds}/>
        {!jobsLoading && <PrintJobs jobs={jobs}/>}
    </MapContainer>
  </Container>
}


type ChangeLocationProps = {
  setZoom:(zoom:number) => void,
  setMapBounds:(location:LatLngBounds) => void,
  userLocationLoading:boolean
}
const ChangeLocation:React.FC<ChangeLocationProps> = ({setMapBounds,userLocationLoading,setZoom}) => {
  const map = useMapEvents({
    dragend() { 
      setMapBounds(map.getBounds());
    },
    zoom(e){
      setMapBounds(map.getBounds());
      setZoom(e.target._animateToZoom);
      console.log(e);
    }
  });
  useEffect(() => {
    setMapBounds(map.getBounds());
  }, [userLocationLoading])
  return <></>
}


const PrintJobs:React.FC<{jobs:JobT[]}> = ({jobs}) => {

  const getCategoryIcon = (url?:string) => {
    return new Icon({
      iconUrl:url,
      iconSize:[25,25]
    });
  };
  const userId = useAppSelector(state => state.user.id);

  return <>
    <MarkerClusterGroup>
      {jobs.map(job => job &&
      <Marker key={job.id} 
      icon={getCategoryIcon(job?.category?.iconUrl)} 
      position={{lat:job.location._lat,lng:job.location._long}} >
        <Popup key={job.id}>
          <button onClick={() => createJobRequest({
            applicant:userId || '',
            createdAt: new Date(),
            job:job.id,
            jobCreator:job?.creator?.id || ''
          })}>
            {job.description}
          </button>
        </Popup>
      </Marker>)}
    </MarkerClusterGroup>
    </>

}