import { Link, useLocation, useParams } from "react-router-dom"
import { navRoutes, routes } from "../../consts/routes";
import { useAppSelector } from "../../hooks/redux"
import { Container, NavLink, UserBalance } from "./styles"
import {IdcardOutlined} from '@ant-design/icons'

export const BottomNavMenu = () => {
    const usersBalance = useAppSelector(state => state.user.balance);
    const currentRoute = useLocation().pathname;
    return <Container>
        {Object.entries(navRoutes).map(route => 
            <NavLink $active={route[1].route === currentRoute} key={route[0]} to={route[1].route}>
                {route[1].icon}
                {route[1].route === navRoutes.myProfile.route && <UserBalance>{(usersBalance  || 0)+`$`}</UserBalance>}
            </NavLink>
        )}
    </Container>
}