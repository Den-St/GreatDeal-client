import { Route, Routes } from "react-router-dom";
import { CreateJob } from "../components/CreateJob";
import { JobSearch } from "../components/JobSearch";
import { Home } from "../containers/Home";
import { JobPage } from "../containers/JobPage";
import { Login } from "../containers/Login";
import Registration from "../containers/Registration/index";

export const routes = {
    home:'/',
    registration:"/registration",
    login:"/login",
    createJob:'/create-job',
    jobSearch:'/job-search',
    job:`/job/:id`
}
export const PublicRoutes = [
    <Route key={routes.home} element={<Home/>} path={routes.home}/>,
    <Route key={routes.login} element={<Login/>} path={routes.login}/>,
    <Route key={routes.registration} element={<Registration/>} path={routes.registration}/>,
    <Route key={routes.createJob} element={<CreateJob/>} path={routes.createJob}/>,
    <Route key={routes.jobSearch} element={<JobSearch/>} path={routes.jobSearch}/>,
    <Route key={routes.job} element={<JobPage/>} path={routes.job}/>
]

export const RoutesSwitch = () => {
    return <Routes>
        {PublicRoutes}
    </Routes>
}