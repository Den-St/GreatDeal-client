import { Route, Routes } from "react-router-dom"
import { UserReport } from "./components/UserReport";
import { UserReports } from "./components/UserReports";

export const adminRoutesPath = {
    userReports:'/admin/userReports',
    userReport:'/admin/userReport/:id'
};

export const AdminRoutes = [
    <Route key={adminRoutesPath.userReports} element={<UserReports/>} path={adminRoutesPath.userReports}/>,
    <Route key={adminRoutesPath.userReport} element={<UserReport/>} path={adminRoutesPath.userReport}/>,
];

export const AdminRoutesSwitch = () => {
    return <Routes>
        {AdminRoutes}
    </Routes>
}