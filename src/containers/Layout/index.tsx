import { useLocation } from "react-router-dom";
import { BottomNavMenu } from "../../components/BottomNavMenu";
import { routes ,navRoutes} from "../../consts/routes";
import { Container, Main, Bottom } from "./styles"

type Props = {
    children:React.ReactNode
}

export const Layout:React.FC<Props> = ({children}) => {
    const excludedRoutes =  [routes.registration, routes.login, navRoutes.createJob.route, '/chat'];
    const route = useLocation().pathname;

    return <Container>
        <Main>
            {children}
        </Main>
        {!excludedRoutes.some(exRoute => route.includes(exRoute)) && <Bottom>
            <BottomNavMenu/>
        </Bottom>}
    </Container>
}