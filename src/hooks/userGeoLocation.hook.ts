import { useAppSelector } from './redux';
import { LatLng } from 'leaflet';
import { useEffect, useState } from 'react';
import { updateUserLocation } from '../firebase/db/users/patch/updateUserLocation';
export const useUserGeoLocation = () => {
    const [position, setPosition] = useState<LatLng | null>(null)
    const userId = useAppSelector(state => state.user.id);

    useEffect(() => {
        if(!userId || !position) return;
        updateUserLocation(userId, {_lat:position.lat, _long:position.lng});
    },[position,userId]);
    return {setPosition,position};
}