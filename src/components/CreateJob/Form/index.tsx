import {CloseCircleOutlined,UploadOutlined} from "@ant-design/icons";
import { CreateJobFormT,  } from "../../../types/job.type"
import { CategoryContainer, CategoryIcon, Container,  ImageContainer,  PhotosInput, PhotosInputContainer, RemovePhotoButton } from "./styles"
import { DebouncedFunc } from "lodash";
import { CategoryT } from "../../../types/category.type";
import { Carousel, Select ,Image, Button, Form, Input} from "antd";
import { Navigate } from "react-router-dom";
import {  Marker, TileLayer } from "react-leaflet";
import { MapContainer } from "react-leaflet";
import { Icon, LatLng } from "leaflet";
import Title from "antd/es/typography/Title";
import { useAppSelector } from "../../../hooks/redux";
const {Option} = Select;

type Props = {
    onSubmit:(data:CreateJobFormT) => void;
    searchCategories:DebouncedFunc<(value?: string | undefined) => Promise<void>>,
    categories:CategoryT[],
    categoriesLoading:boolean,
    chosenCategory:CategoryT | null,
    onChangeCategory:(categoryStringifies:string) => void;
    success:boolean;
    pickedLocation:LatLng | null,
}

export const CreateJobForm:React.FC<Props> = ({pickedLocation,success,onSubmit,searchCategories,categoriesLoading,categories,chosenCategory,onChangeCategory}) => {
    const [form] = Form.useForm<CreateJobFormT>();
    const images = Form.useWatch('images', form);
    const maxPhotos = 5;
    const onChangeImages = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const oldImages = images;
        if (oldImages?.length === maxPhotos) return;

        const newPhotos = Object.keys(e.target.files).slice(0,maxPhotos - (oldImages?.length || 0)).map(fileIndex => e?.target?.files?.[+fileIndex]);
        form.setFieldValue('images',oldImages?.length ? [...oldImages,...newPhotos] : newPhotos);
    }

    const removeImage = (image:File) => {
        form.setFieldValue('images',images?.filter((file:File) => file !== image) || []);
    }
    const icon = new Icon({
        iconUrl:'https://img.icons8.com/?size=512&id=13800&format=png',
        iconSize:[30,30]
    });

    if(success) return <Navigate to={'/'}/>
    return <Container >
        <MapContainer center={new LatLng(pickedLocation?.lat || 0, pickedLocation?.lng || 0)} zoom={15} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker icon={icon} position={new LatLng(pickedLocation?.lat || 0,pickedLocation?.lng || 0)}/>
        </MapContainer>
        {!!images?.length && <Carousel>
            {images?.map((image:File) => <ImageContainer key={image.lastModified}>
                <Image src={URL.createObjectURL(image)} preview={{src:URL.createObjectURL(image)}}/>
                <RemovePhotoButton onClick={() => removeImage(image)}><CloseCircleOutlined/></RemovePhotoButton>
                </ImageContainer>)}
        </Carousel>}
        <Form layout="vertical" onFinish={onSubmit} form={form} style={{width:'80%'}}>
            <Title level={5}>{!images?.length ? `Pick images` : `Add images`}</Title>
            <PhotosInputContainer style={{marginBottom:'20px'}} $disabled={images?.length === maxPhotos}>
                {images?.length ? <p>+</p> : <UploadOutlined/>}
                <PhotosInput disabled={images?.length === maxPhotos} type={'file'} onChange={onChangeImages} multiple={true} max={5}/>
            </PhotosInputContainer> 
            <Form.Item 
                style={{display:'none'}}
                name={'images'}
                rules={[{ required: true, message: 'Please choose images!' }]}
            >
            </Form.Item>
            <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: 'Please choose category!' }]}
            >
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
            </Form.Item>
            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please input title!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input description!' }]}
            >
                <Input.TextArea autoSize={true} />
            </Form.Item>    
            <Form.Item
                label="Reward"
                name="reward"
                rules={[{ required: true, message: 'Please input reward!'}]}
            >
                <Input type={'number'} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </Container>
}