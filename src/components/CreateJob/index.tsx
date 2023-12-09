import { BackButton, ConfirmLocationButton, Container, Header, LeavePage, StepTitle } from "./styles";
import {ArrowLeftOutlined} from "@ant-design/icons";
import { LocationPickerMap } from "./LocationPicker";
import { UserLocationLoader } from "../../assets/UserLocationLoader";
import { CreateJobForm } from "./Form";
import { useCreateJob } from "../../hooks/createJob.hook";
import { useSearchCategories } from "../../hooks/searchCategories.hook";
import { Spin } from "antd";
import { useEffect } from "react";

export const CreateJob = () => {
    const {pickedLocation,setLocation,step,userLocationLoading,success,
          setUserLocationLoading,nextStep,prevStep,onSubmit,category,onChangeCategory} = useCreateJob();
    const {debounceSearchCategories,categories,categoriesLoading} = useSearchCategories();
    useEffect(() => {
        document.title = 'Create job - GreatDeal';
    },[]);
    
    const steps = [
        {
            component:<LocationPickerMap setUserLocationLoading={setUserLocationLoading}
            setLocation={setLocation} pickedLocation={pickedLocation}/>,
            title:"Choose location"
        },
        {
            component:<CreateJobForm
             searchCategories={debounceSearchCategories} categories={categories}
             onSubmit={onSubmit} categoriesLoading={categoriesLoading} chosenCategory={category}
             onChangeCategory={onChangeCategory} success={success} pickedLocation={pickedLocation}/>,
            title:"Fill the form"
        }
    ];

    return <Container>
        <Header>
            {step !== 1 ? <BackButton disabled={step === 1} onClick={prevStep}><ArrowLeftOutlined /></BackButton>
                        : <LeavePage to={'/'}><ArrowLeftOutlined /></LeavePage>}
            <StepTitle>{steps[step - 1].title}</StepTitle>
        </Header>
        {userLocationLoading && !pickedLocation && <UserLocationLoader><Spin /></UserLocationLoader>}
        {steps[step - 1].component}
        {step === 1 && !!pickedLocation && <ConfirmLocationButton onClick={nextStep}>Confirm location</ConfirmLocationButton>}
    </Container>
}