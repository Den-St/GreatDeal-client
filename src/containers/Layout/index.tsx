import { useLocation } from "react-router-dom";
import { Container, Main, Bottom } from "./styles"

type Props = {
    children:React.ReactNode
}

export const Layout:React.FC<Props> = ({children}) => {
    const excludedRoutes =  ['/registration', '/login'];
    const route = useLocation().pathname;
    
    return <Container>
        <Main>
            {children}
        </Main>
        {!excludedRoutes.includes(route) && <Bottom>
            sfasdas
        </Bottom>}
    </Container>
}