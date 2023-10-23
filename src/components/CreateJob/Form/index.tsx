import {CloseCircleOutlined,UploadOutlined} from "@ant-design/icons";
import { FieldErrors, useForm } from "react-hook-form"
import { CreateJobFormT, CreateJobT } from "../../../types/job.type"
import { CategoryContainer, CategoryIcon, Container, CreateButton, DescriptionTextarea, ImageContainer, InputBlock, InputHeader, PhotosInput, PhotosInputContainer, RemovePhotoButton } from "./styles"
import { DebouncedFunc } from "lodash";
import { CategoryT } from "../../../types/category.type";
import { Alert, Carousel, Select, Space ,Image, Button, message} from "antd";
import { Navigate } from "react-router-dom";
import {  Marker, TileLayer } from "react-leaflet";
import { MapContainer } from "react-leaflet";
import { Icon, LatLng } from "leaflet";
import { Display } from "../../../assets/Display";
import { useEffect, useState } from "react";
const {Option} = Select;

// import 'leaflet/dist/leaflet.css';

type Props = {
    onSubmit:(data:CreateJobFormT) => void;
    searchCategories:DebouncedFunc<(value?: string | undefined) => Promise<void>>,
    categories:CategoryT[],
    categoriesLoading:boolean,
    chosenCategory:CategoryT | null,
    onChangeCategory:(categoryStringifies:string) => void;
    success:boolean;
    pickedLocation:LatLng | null
}

export const CreateJobForm:React.FC<Props> = ({pickedLocation,success,onSubmit,searchCategories,categoriesLoading,categories,chosenCategory,onChangeCategory}) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState:{errors},
        
    } = useForm<CreateJobFormT>();
    type typeOfErrors = keyof FieldErrors<CreateJobFormT>;
    const maxPhotos = 5;
    const fieldsKeys = ['title','description','reward','category'];
    const [messageApi, contextHolder] = message.useMessage();
    const showError = (message:string,key:string) => {
      messageApi.open({
        type: 'error',
        content: message,
        key,
        duration:120
      });
    }
    const clearError = (key:string) => {
      messageApi.destroy(key);
    }

    useEffect(() => {
        Object.keys(watch()).forEach((errorKey:string) => {
            clearError(errorKey);
            let errorMessage = errors[errorKey as typeOfErrors]?.message;
            if(errorMessage){
                showError(errorMessage,errorKey);
            }
            if(!watch('images')?.length){
                showError('Images is required','images');
            }
        });
    },[errors]);
   
    const onChangeImages = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const oldImages = watch('images');
        if (oldImages?.length === maxPhotos) return;

        const newPhotos = Object.keys(e.target.files).slice(0,maxPhotos - (oldImages?.length || 0)).map(fileIndex => e?.target?.files?.[+fileIndex]);
        //@ts-ignore
        setValue('images',oldImages?.length ? [...oldImages,...newPhotos] : newPhotos);
    }

    const removeImage = (image:File) => {
        setValue('images',watch('images')?.filter(file => file !== image) || []);
    }
    const icon = new Icon({
        iconUrl:'https://img.icons8.com/?size=512&id=13800&format=png',
        iconSize:[30,30]
    });
    console.log('f',errors);
    if(success) return <Navigate to={'/'}/>
    return <Container onSubmit={handleSubmit(onSubmit)}>
        {contextHolder}
        <MapContainer center={new LatLng(pickedLocation?.lat || 0, pickedLocation?.lng || 0)} zoom={15} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker icon={icon} position={new LatLng(pickedLocation?.lat || 0,pickedLocation?.lng || 0)}/>
        </MapContainer>
        {!!watch("images")?.length && <Carousel >
            {watch("images").map(image => <ImageContainer key={image.lastModified}>
                <Image src={URL.createObjectURL(image)} preview={{src:URL.createObjectURL(image)}}/>
                <RemovePhotoButton onClick={() => removeImage(image)}><CloseCircleOutlined/></RemovePhotoButton>
                </ImageContainer>)}
        </Carousel>}
        <Display direction="column" padding="0 0 0 40px" gap={'10px'}>
            <Space size={'large'}>
                <InputHeader>Choose photos:</InputHeader>
                <PhotosInputContainer $disabled={watch('images')?.length === maxPhotos}>
                    {watch('images')?.length ? <p>+</p> : <UploadOutlined/>}
                    <PhotosInput disabled={watch('images')?.length === maxPhotos} type={'file'} onChange={onChangeImages} multiple={true} max={5}/>
                </PhotosInputContainer> 
            </Space>
            <Space direction="vertical">
                <InputHeader>Short title:</InputHeader>
                <input {...register('title',{required:{message:'Title is required',value:true},})}/>
            </Space>

            <Space direction="vertical">
                <InputHeader>Description:</InputHeader>
                <DescriptionTextarea {...register('description',{
                    required:{message:'Description is required',value:true},
                    maxLength:{message:'Description is too long',value:50,},
                    minLength:{message:'Description is too short',value:10,}})}/>
            </Space>
            <Space>
                <InputHeader>Reward:</InputHeader>
                <input type="number" {...register('reward',{required:{message:'Reward is required', value:true}})}/>
            </Space>
            <InputHeader>Category:</InputHeader>
            <Select
                className="select"
                loading={categoriesLoading}
                onSearch={searchCategories}
                showSearch
                style={{'width':'80%'}}
                value={chosenCategory ? JSON.stringify(chosenCategory) : ''}
                onChange={onChangeCategory}
                >
                {categories && categories.map(category => 
                    <Option key={category.id} value={JSON.stringify(category)}>
                        <CategoryContainer>
                            <CategoryIcon src={category.iconUrl.replace('FFFFFF',"000000")}/>
                            {category.name}
                        </CategoryContainer>
                    </Option>
                )}
            </Select>
            <CreateButton type={'submit'} value={'Create'}/>
        </Display>
    </Container>
}