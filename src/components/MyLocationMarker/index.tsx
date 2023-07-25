import { Icon, LatLng } from "leaflet";
import { useState, useEffect } from "react";
import { useMapEvents, Marker, Popup } from "react-leaflet";

type Props = {
  setUserLocationLoading:(val:boolean) => void,
}

export const MyLocationMarker:React.FC<Props> = ({setUserLocationLoading}) => {
    const [position, setPosition] = useState<LatLng | null>(null)
    const map = useMapEvents({
      locationfound(e) {
        setPosition(e.latlng);
        map.setView(e.latlng);
        setUserLocationLoading(false);
      },
    });

    const icon = new Icon({
      iconUrl:'https://img.icons8.com/?size=512&id=7880&format=png',
      iconSize:[30,30]
    });

    useEffect(() => {
        setUserLocationLoading(true);
        map.locate();
    },[])
    
    return position === null ? null : (
      <Marker icon={icon} position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }