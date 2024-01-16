import { Navigate, Route, Routes } from "react-router-dom";
import { MyChatRooms, ChatRoom, CreateJob, JobSearch, MyProfilePage } from "./../pages";
import { Home } from "../containers/Home";
import { JobPage } from "../containers/JobPage";
import { Login } from "../containers/Login";
import Registration from "../containers/Registration/index";
import {CommentOutlined,PlusCircleOutlined,SearchOutlined,EnvironmentOutlined,IdcardOutlined} from '@ant-design/icons';
import { UserProfile } from "../components/UserProfile";
import { ReportForm } from "../components/ReportForm";
import { Deposit } from "../components/Deposit";
import { AfterPayment } from "../components/AfterPayment";

export const routes = {
    registration:"/registration",
    login:"/login",
    job:`/job/:id`,
    user:`/user/:id`,
    chat:`/chat/:id`,
    deposit:`/deposit`,
    afterPayment:'/after-payment',
    home:'/',
    jobSearch:'/job-search',
    createJob:'/create-job',
    myChatRooms:'/my-chatrooms',
    myProfile:'/myProfile'
};
export type routesKeysType = 'home' | 'registration' | 'login' | 'job' | 'user' | 'chat' | 'deposit' | 'afterPayment' | 'jobSearch' | 'createJob' | 'myChatRooms' | 'myProfile';

export const baseRoute = '/GreatDeal-client'

const routeWrap = (route:string) => baseRoute + route;

export const wrappedRoutes:Record<routesKeysType,string>  = {
    registration:'',
    login:'',
    job:'',
    user:'',
    chat:'',
    deposit:'',
    afterPayment:'',
    home:'',
    jobSearch:'',
    createJob:'',
    myChatRooms:'',
    myProfile:''
};
Object.keys(routes).forEach(key => wrappedRoutes[key as routesKeysType] = routeWrap(routes[key as routesKeysType]));

export const navRoutes = {
    home:{
        route:wrappedRoutes.home,
        label:'map',
        icon:<EnvironmentOutlined  />
    },
    jobSearch:{
        route:wrappedRoutes.jobSearch,
        label:'search',
        icon:<SearchOutlined />
    },
    createJob:{
        route:wrappedRoutes.createJob,
        label:'create',
        icon:<PlusCircleOutlined />
    },
    myChatrooms:{
        route:wrappedRoutes.myChatRooms,
        label:'my chatrooms',
        icon:<CommentOutlined />
    },
    myProfile:{
        route:wrappedRoutes.myProfile,
        label:'My Profile',
        icon:<IdcardOutlined />
    },
}


export const PublicRoutes = [
    <Route key={navRoutes.home.route} element={<Home/>} path={navRoutes.home.route}/>,
    <Route key={wrappedRoutes.login} element={<Login/>} path={wrappedRoutes.login}/>,
    <Route key={wrappedRoutes.registration} element={<Registration/>} path={wrappedRoutes.registration}/>,
    <Route key={navRoutes.createJob.route} element={<CreateJob/>} path={navRoutes.createJob.route}/>,
    <Route key={navRoutes.jobSearch.route} element={<JobSearch/>} path={navRoutes.jobSearch.route}/>,
    <Route key={wrappedRoutes.job} element={<JobPage/>} path={wrappedRoutes.job}/>,
    <Route key={navRoutes.myProfile.route} element={<MyProfilePage/>} path={navRoutes.myProfile.route}/>,
    <Route key={navRoutes.myChatrooms.route} element={<MyChatRooms/>} path={navRoutes.myChatrooms.route}/>,
    <Route key={wrappedRoutes.chat} element={<ChatRoom/>} path={wrappedRoutes.chat}/>,
    <Route key={wrappedRoutes.user} element={<UserProfile/>} path={wrappedRoutes.user}/>,
    <Route key={wrappedRoutes.deposit} element={<Deposit/>} path={wrappedRoutes.deposit}/>,
    <Route key={wrappedRoutes.afterPayment} element={<AfterPayment/>} path={wrappedRoutes.afterPayment}/>,
]

export const RoutesSwitch = () => {
    return <Routes>
        {PublicRoutes}
    </Routes>
}