import { Icon, LatLng } from 'leaflet'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import { MyLocationMarker } from '../../MyLocationMarker'
import { Container } from './styles'
import 'leaflet/dist/leaflet.css';

type Props = {
    pickedLocation:null | LatLng,
    setLocation:(pos:LatLng) => void,
    setUserLocationLoading:(val:boolean) => void,
}

export const LocationPickerMap:React.FC<Props> = ({pickedLocation,setLocation,setUserLocationLoading}) => {
  return <Container>
  <MapContainer center={pickedLocation || [46,34]} zoom={13} scrollWheelZoom={false}>
    <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <MyLocationMarker setUserLocationLoading={setUserLocationLoading}/>
    <LocationPicker setLocation={setLocation} pickedLocation={pickedLocation}/>
  </MapContainer>
</Container>
}

type LocationPickerProps = {
    pickedLocation:null | LatLng,
    setLocation:(pos:LatLng) => void,
}

const LocationPicker:React.FC<LocationPickerProps> = ({pickedLocation,setLocation}) => {
    useMapEvents({
      click(e) { 
        setLocation(e.latlng);
      },

    });
    
    const icon = new Icon({
      iconUrl:'https://img.icons8.com/?size=512&id=13800&format=png',
      iconSize:[30,30]
    });

    return pickedLocation === null ? null : (
      <Marker icon={icon} position={pickedLocation} title={'PICKED'}/>
    )
}
