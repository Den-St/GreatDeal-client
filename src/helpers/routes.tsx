import { Route, Routes } from "react-router-dom";
import { Home } from "../containers/Home";
import { Login } from "../containers/Login";
import Registration from "../containers/Registration/index";

export const routes = {
    home:'/',
    registration:"/registration",
    login:"/login",
}
export const PublicRoutes = [
    <Route key={routes.home} element={<Home/>} path={routes.home}/>,
    <Route key={routes.login} element={<Login/>} path={routes.login}/>,
    <Route key={routes.registration} element={<Registration/>} path={routes.registration}/>
]

export const RoutesSwitch = () => {
    return <Routes>
        {PublicRoutes}
    </Routes>
}