import { Spin } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom"
import { Display } from "../../assets/Display"
import { wrappedRoutes } from "../../consts/routes";
import { useActivatePayment } from "../../hooks/activatePayment";

const statuses:Record<number,React.ReactNode> = {
    0:<>
        <h3 style={{'color':'white'}}>You already activated this deposit!</h3>
    </>,
    1:<>
        <h3 style={{'color':'white'}}>You successfully deposited to your account!</h3>
        <p style={{'color':'white'}}>Now you can order work from other users</p>
    </>,
    2:<>
        <h3 style={{'color':'white'}}>There is no such deposit!</h3>
    </>,
}

export const AfterPayment = () => {
    const {statusCode,loading} = useActivatePayment();
    
    useEffect(() => {
        document.title = 'Payment success - GreatDeal';
    },[]);

    return <Display style={{width:'100%','height':'90vh','alignItems':'center','justifyContent':'center',background:'rgb(31,32,36)',flexDirection:'column'}}>
        {loading ? <Spin/> : statusCode !== undefined && statuses[statusCode]};
        <Link to={wrappedRoutes.home} style={{textDecoration:'none',color:'white'}}>Go to main page</Link>
    </Display>
}