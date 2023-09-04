import {CloseCircleOutlined,UploadOutlined} from "@ant-design/icons";
import { useForm } from "react-hook-form"
import { CreateJobFormT, CreateJobT } from "../../../types/job.type"
import { CategoryContainer, CategoryIcon, Container, CreateButton, DescriptionTextarea, ImageContainer, InputBlock, InputHeader, PhotosInput, PhotosInputContainer, RemovePhotoButton } from "./styles"
import { DebouncedFunc } from "lodash";
import { CategoryT } from "../../../types/category.type";
import { Alert, Carousel, Select, Space ,Image, Button} from "antd";
import { Navigate } from "react-router-dom";
import {  Marker, TileLayer } from "react-leaflet";
import { MapContainer } from "react-leaflet";
import { Icon, LatLng } from "leaflet";
import { Display } from "../../../assets/Display";
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
    
    const onChangeImages = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        //@ts-ignore
        setValue('images',Object.keys(e.target.files).map(fileIndex => e.target.files[+fileIndex])) 
    }
    const removeImage = (image:File) => {
        setValue('images',watch('images')?.filter(file => file !== image) || []);
    }
    const icon = new Icon({
        iconUrl:'https://img.icons8.com/?size=512&id=13800&format=png',
        iconSize:[30,30]
      });

    if(success) return <Navigate to={'/'}/>
    
    return <Container onSubmit={handleSubmit(onSubmit)}>
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
                <PhotosInputContainer>
                    <UploadOutlined/>
                    <PhotosInput type={'file'} onChange={onChangeImages} multiple={true}/>
                </PhotosInputContainer>
            </Space>
            <Space direction="vertical">
                <InputHeader>Short title:</InputHeader>
                <input {...register('title',{required:true, maxLength:50})}/>
                {watch('title')?.length > 50 && <Alert style={{'width':'80%'}} type={'error'} message={'Title is too long'} showIcon/>}
            </Space>

            <Space direction="vertical">
                <InputHeader>Description:</InputHeader>
                <DescriptionTextarea {...register('description',{required:true,maxLength:200,minLength:30})}/>
                {watch('description')?.length > 200 && <Alert type={'error'} message={errors.description?.message} showIcon/>}
            </Space>
            <Space>
                <InputHeader>Reward:</InputHeader>
                <input type="number" {...register('reward',{required:true,})}/>
            </Space>
            <InputHeader>Category:</InputHeader>
            <Select
                value={chosenCategory ? JSON.stringify(chosenCategory) : ''}
                onChange={onChangeCategory}
                className="select"
                loading={categoriesLoading}
                onSearch={searchCategories}
                showSearch
                style={{'width':'80%'}}
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