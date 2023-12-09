import { useLocation } from "react-router-dom";
import { BottomNavMenu } from "../../components/BottomNavMenu";
import { routes ,navRoutes} from "../../consts/routes";
import { useAppSelector } from "../../hooks/redux";
import { Container, Main, Bottom } from "./styles"

type Props = {
    children:React.ReactNode
}

export const Layout:React.FC<Props> = ({children}) => {
    const excludedRoutes =  [routes.registration, routes.login, navRoutes.createJob.route, '/chat', '/userReport', '/job/',routes.deposit];
    const route = useLocation().pathname;
    const isBanned = useAppSelector(user => user.user.isBanned);

    return <Container>
        <Main>
            {children}
        </Main>
        {isBanned !== true && !excludedRoutes.some(exRoute => route.includes(exRoute)) && <Bottom>
            <BottomNavMenu/>
        </Bottom>}
    </Container>
}