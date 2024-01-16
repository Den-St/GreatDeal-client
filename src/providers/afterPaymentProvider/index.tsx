import { Navigate, useLocation, useSearchParams } from "react-router-dom";
import { wrappedRoutes } from "../../consts/routes"

type Props = {
    children:React.ReactNode
}

export const AfterPaymentProvider:React.FC<Props> = ({children}) => {
    const depositId = useSearchParams()[0].get('deposit_id');
    const route = useLocation().pathname;

    if(depositId && route !== wrappedRoutes.afterPayment) return <Navigate to={wrappedRoutes.afterPayment + `?deposit_id=${depositId}`}/>
    return <>{children}</>
}