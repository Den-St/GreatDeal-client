import { Route, Routes } from "react-router-dom";
import { MyChatRooms, ChatRoom, CreateJob, JobSearch, MyProfilePage } from "./../pages";
import { Home } from "../containers/Home";
import { JobPage } from "../containers/JobPage";
import { Login } from "../containers/Login";
import Registration from "../containers/Registration/index";
import {CommentOutlined,PlusCircleOutlined,SearchOutlined,EnvironmentOutlined,IdcardOutlined} from '@ant-design/icons';
import { UserProfile } from "../components/UserProfile";
import { ReportForm } from "../components/ReportForm";

export const navRoutes = {
    home:{
        route:'/',
        label:'map',
        icon:<EnvironmentOutlined  />
    },
    jobSearch:{
        route:'/job-search',
        label:'search',
        icon:<SearchOutlined />
    },
    createJob:{
        route:'/create-job',
        label:'create',
        icon:<PlusCircleOutlined />
    },
    myChatrooms:{
        route:'/my-chatrooms',
        label:'my chatrooms',
        icon:<CommentOutlined />
    },
    myProfile:{
        route:'/myProfile',
        label:'My Profile',
        icon:<IdcardOutlined />
    },

}
export const routes = {
    registration:"/registration",
    login:"/login",
    job:`/job/:id`,
    user:`/user/:id`,
    chat:`/chat/:id`,
};

export const PublicRoutes = [
    <Route key={navRoutes.home.route} element={<Home/>} path={navRoutes.home.route}/>,
    <Route key={routes.login} element={<Login/>} path={routes.login}/>,
    <Route key={routes.registration} element={<Registration/>} path={routes.registration}/>,
    <Route key={navRoutes.createJob.route} element={<CreateJob/>} path={navRoutes.createJob.route}/>,
    <Route key={navRoutes.jobSearch.route} element={<JobSearch/>} path={navRoutes.jobSearch.route}/>,
    <Route key={routes.job} element={<JobPage/>} path={routes.job}/>,
    <Route key={navRoutes.myProfile.route} element={<MyProfilePage/>} path={navRoutes.myProfile.route}/>,
    <Route key={navRoutes.myChatrooms.route} element={<MyChatRooms/>} path={navRoutes.myChatrooms.route}/>,
    <Route key={routes.chat} element={<ChatRoom/>} path={routes.chat}/>,
    <Route key={routes.user} element={<UserProfile/>} path={routes.user}/>,
]

export const RoutesSwitch = () => {
    return <Routes>
        {PublicRoutes}
    </Routes>
}