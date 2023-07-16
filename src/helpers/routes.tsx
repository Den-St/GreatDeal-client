import { Route, Routes } from "react-router-dom";
import { Login } from "../containers/Login";
import Registration from "../containers/Registration/index";

export const routes = {
    registration:"/registration",
    login:"/login",
}
export const PublicRoutes = [
    <Route key={routes.login} element={<Login/>} path={routes.login}/>,
    <Route key={routes.registration} element={<Registration/>} path={routes.registration}/>
]

export const RoutesSwitch = () => {
    return <Routes>
        {PublicRoutes}
    </Routes>
}