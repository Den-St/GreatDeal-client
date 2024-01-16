import { Route, Routes } from "react-router-dom"
import { UserReport } from "./components/UserReport";
import { UserReports } from "./components/UserReports";

export const adminRoutesPath = {
    userReports:'/admin/userReports',
    userReport:'/admin/userReport/:id',
};

export type routesKeysType = 'userReports' | 'userReport';

export const baseRoute = '/GreatDeal-client'

const routeWrap = (route:string) => baseRoute + route;

export const wrappedAdminRoutes:Record<routesKeysType,string>  = {
    userReports:'',
    userReport:'',
};
Object.keys(adminRoutesPath).forEach(key => wrappedAdminRoutes[key as routesKeysType] = routeWrap(adminRoutesPath[key as routesKeysType]));

export const AdminRoutes = [
    <Route key={wrappedAdminRoutes.userReports} element={<UserReports/>} path={wrappedAdminRoutes.userReports}/>,
    <Route key={wrappedAdminRoutes.userReport} element={<UserReport/>} path={wrappedAdminRoutes.userReport}/>,
];

export const AdminRoutesSwitch = () => {
    return <Routes>
        {AdminRoutes}
    </Routes>
}