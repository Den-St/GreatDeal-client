import { addDoc } from "firebase/firestore";
import { LatLng } from "leaflet";
import { jobsCollection } from "../jobs.collection";

export const createJob = async (location:LatLng) => {
    try{
        await addDoc(jobsCollection,{location:{_lat:location.lat,_long:location.lng}});
    }catch(err){
        console.error(err);
    }
}