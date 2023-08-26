import { ref, uploadBytes } from "firebase/storage";
import { LatLng } from "leaflet";
import { useState } from "react";
import { v4 } from "uuid";
import { createJob } from "../firebase/db/jobs/create/createJob";
import { storage } from "../firebase/firebaseInit";
import { CategoryT } from "../types/category.type";
import { CreateJobFormT, CreateJobT } from "../types/job.type";
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
    const uploadImages = async (files:File[]) => {
        const imagesRef = files.map(file => ref(storage, `jobImages/${file.name + v4()}`));
        const uploadQ = imagesRef.map(async (ref,i) => await uploadBytes(ref,files[i]));
        return await Promise.all(uploadQ);
    }
    const creator = useAppSelector(state => state.user);
    const onSubmit = async (data:CreateJobFormT) => {
        try{
            if(!pickedLocation || !category) return;
            const images = await uploadImages(data.images);
            await createJob({...data,location:{_lat:pickedLocation.lat,_long:pickedLocation.lng},creator,category,images:images?.map(image => image.metadata.fullPath) || []});
            setSuccess(true);
        }catch(err){
            console.error(err);
        }
    }
    return {success,onChangeCategory,pickedLocation,category,setLocation,step,userLocationLoading,setUserLocationLoading,nextStep,prevStep,onSubmit,creator};
}