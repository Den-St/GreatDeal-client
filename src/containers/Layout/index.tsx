import { useLocation } from "react-router-dom";
import { BottomNavMenu } from "../../components/BottomNavMenu";
import { routes } from "../../helpers/routes";
import { Container, Main, Bottom } from "./styles"

type Props = {
    children:React.ReactNode
}

export const Layout:React.FC<Props> = ({children}) => {
    const excludedRoutes =  [routes.registration, routes.login, routes.createJob];
    const route = useLocation().pathname;
    
    return <Container>
        <Main>
            {children}
        </Main>
        {!excludedRoutes.includes(route) && <Bottom>
            <BottomNavMenu/>
        </Bottom>}
    </Container>
}