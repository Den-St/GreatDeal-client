import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { Container } from './styles'
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { LatLng } from 'leaflet';
import { getJobs } from '../../firebase/db/jobs/get/getJobs';
import { createJob } from '../../firebase/db/jobs/create/createJob';
import { JobT } from '../../types/job.type';

export const HomeComponent = () => {

    return <Container>
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MyLocationMarker/>
        <SelectedPointMarker/>
        <PrintJobs/>
    </MapContainer>
  </Container>
}

const MyLocationMarker = () => {
    const [position, setPosition] = useState<LatLng | null>(null)
    const map = useMapEvents({
      locationfound(e) {
        setPosition(e.latlng);
        map.setView(e.latlng);
      },
    });
    
    useEffect(() => {
        map.locate();
    }, [])
    
    return position === null ? null : (
      <Marker position={position} title={"YOU"}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

function SelectedPointMarker() {
    const [position, setPosition] = useState<LatLng | null>(null)
    useMapEvents({
      click(e) { 
        setPosition(e.latlng);
        //createJob(e.latlng);
      },
    });
    
    return position === null ? null : (
      <Marker position={position} title={'PICKED'}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

const PrintJobs = () => {
    const [jobs,setJobs] = useState<JobT[]>([]);
    useEffect(() => {
      getJobs().then((jobs) => setJobs(jobs || []));
    },[]);

    return <>
      {jobs.map(job => 
      <Marker key={job.id} position={{lat:job.location._lat,lng:job.location._long}}
       title={'PICKED'}>
        <Popup>{job.reward}</Popup>
      </Marker>)}
    </>

}