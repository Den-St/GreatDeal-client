import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import { Container } from './styles'
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { JobT } from '../../types/job.type';
import { MyLocationMarker } from '../MyLocationMarker';
import { UserLocationLoader } from '../../assets/UserLocationLoader';
import { LatLngBounds } from 'leaflet';
import MarkerClusterGroup from "react-leaflet-cluster";
import { usePrintNearJobs } from '../../hooks/printNearJobs.hook';
import { getCategoryIcon } from '../../helpers/getCategoryIcon';
import { JobPopup } from '../JobPopup';
import { Spin } from 'antd';

export const HomeComponent = () => {
  const [userLocationLoading,setUserLocationLoading] = useState(true);
  const {jobs,jobsLoading,setMapBounds,setZoom,zoom} = usePrintNearJobs();
  
  return <Container>
      <MapContainer center={[51.505, -0.09]} zoom={zoom} scrollWheelZoom={false}>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userLocationLoading && <UserLocationLoader><Spin/></UserLocationLoader>}
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
    }
  });

  useEffect(() => {
    setMapBounds(map.getBounds());
  }, [userLocationLoading])
  return <></>
}


const PrintJobs:React.FC<{jobs:JobT[]}> = ({jobs}) => {
  return <>
    <MarkerClusterGroup>
      {jobs.map(job => 
      <Marker autoPan={false} key={job.id} 
      icon={getCategoryIcon(job?.category?.iconUrl)} 
      position={{lat:job.location._lat,lng:job.location._long}} >
        <Popup autoPan={false} keepInView={false}>
          <JobPopup job={job}/>
        </Popup>
      </Marker>)}
    </MarkerClusterGroup>
    </>
}