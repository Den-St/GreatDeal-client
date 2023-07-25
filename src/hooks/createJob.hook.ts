import { LatLng } from "leaflet";
import { useState } from "react";
import { createJob } from "../firebase/db/jobs/create/createJob";
import { CategoryT } from "../types/category.type";
import { CreateJobT } from "../types/job.type";
import { useAppSelector } from "./redux";

export const useCreateJob = () => {
    const [pickedLocation,setLocation] = useState<null | LatLng>(null);
    const [step,setStep] = useState(1);
    const maxStepNumber = 2;
    const [userLocationLoading,setUserLocationLoading] = useState(true);
    const [category,setCategory] = useState<CategoryT | null>(null);
    const [success,setSuccess] = useState(false);

    const onChangeCategory = (categoryStringified:string) => {
        setCategory(JSON.parse(categoryStringified) as CategoryT);
    }
    const nextStep = () => {
        if(step === maxStepNumber) return;
        setStep(prev => ++prev);
    }

    const prevStep = () => {
        if(step === 1) return;
        setStep(prev => --prev);
    };

    const creator = useAppSelector(state => state.user);
    const onSubmit = async (data:CreateJobT) => {
        try{
            if(!pickedLocation || !category) return;
            await createJob({...data,location:{_lat:pickedLocation.lat,_long:pickedLocation.lng},creator,category});
            setSuccess(true);
        }catch(err){
            console.error(err);
        }
    }
    return {success,onChangeCategory,pickedLocation,category,setLocation,step,userLocationLoading,setUserLocationLoading,nextStep,prevStep,onSubmit,creator};
}