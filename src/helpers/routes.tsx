import { Route, Routes } from "react-router-dom";
import Registration from "../containers/Registration/index";

export const routes = {
    registration:"/registration",
    login:"/login",
}
export const PublicRoutes = [
    <Route key={routes.login} element={<></>} path={routes.login}/>,
    <Route key={routes.registration} element={<Registration/>} path={routes.registration}/>
]

export const RoutesSwitch = () => {
    return <Routes>
        {PublicRoutes}
    </Routes>
}