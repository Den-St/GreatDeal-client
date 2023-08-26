import { Link, useLocation, useParams } from "react-router-dom"
import { navRoutes } from "../../consts/routes";
import { useAppSelector } from "../../hooks/redux"
import { Container, NavLink } from "./styles"
import {IdcardOutlined} from '@ant-design/icons'

export const BottomNavMenu = () => {
    const currentRoute = useLocation().pathname;
    return <Container>
        {Object.entries(navRoutes).map(route => 
            <NavLink $active={route[1].route === currentRoute} key={route[0]} to={route[1].route}>{route[1].icon}</NavLink>
        )}
    </Container>
}