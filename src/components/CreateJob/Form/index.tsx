import { useForm } from "react-hook-form"
import { CreateJobT } from "../../../types/job.type"
import { Container, CreateButton, InputBlock, InputHeader } from "./styles"
import { DebouncedFunc } from "lodash";
import { CategoryT } from "../../../types/category.type";
import { Select } from "antd";
import { Navigate } from "react-router-dom";
const {Option} = Select;

type Props = {
    onSubmit:(data:CreateJobT) => void;
    searchCategories:DebouncedFunc<(value?: string | undefined) => Promise<void>>,
    categories:CategoryT[],
    categoriesLoading:boolean,
    chosenCategory:CategoryT | null,
    onChangeCategory:(categoryStringifies:string) => void;
    success:boolean;
}

export const CreateJobForm:React.FC<Props> = ({success,onSubmit,searchCategories,categoriesLoading,categories,chosenCategory,onChangeCategory}) => {
    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm<CreateJobT>();

    if(success) return <Navigate to={'/'}/>
    return <Container onSubmit={handleSubmit(onSubmit)}>
        <InputBlock>
            <InputHeader>Short title:</InputHeader>
            <input {...register('title')}/>
        </InputBlock>
        <InputBlock>
            <InputHeader>Description:</InputHeader>
            <textarea {...register('description')}/>
        </InputBlock>
        <InputBlock>
            <InputHeader>Price:</InputHeader>
            <input type="number" {...register('reward')}/>
        </InputBlock>
        <Select
            value={JSON.stringify(chosenCategory) || ''}
            onChange={onChangeCategory}
            className="select"
            loading={categoriesLoading}
            onSearch={searchCategories}
            showSearch
            >
            {categories && categories.map(category => 
                <Option key={category.id} value={JSON.stringify(category)}>
                    {category.name}
                </Option>
            )}
        </Select>
        <CreateButton type={'submit'} content={'Create'}/>
    </Container>
}