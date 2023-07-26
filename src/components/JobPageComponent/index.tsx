import { useJobPage } from "../../hooks/jobPage.hook";

export const JobPageComponent = () => {
    const {job,jobLoading} = useJobPage();
    return <>
    {job?.id}
    </>
}