import { useEffect } from "react";
import { Link } from "react-router-dom"
import { Display } from "../../assets/Display"
import { useActivatePayment } from "../../hooks/activatePayment";

export const AfterPayment = () => {
    useActivatePayment();
    
    useEffect(() => {
        document.title = 'Payment success - GreatDeal';
    },[]);

    return <Display style={{width:'100%','height':'90vh','alignItems':'center','justifyContent':'center',background:'rgb(31,32,36)',flexDirection:'column'}}>
        <h3 style={{'color':'white'}}>You successfully deposited to your account!</h3>
        <p style={{'color':'white'}}>Now you can order work from other users</p>
        <Link to={'/'} style={{textDecoration:'none',color:'white'}}>Go to main page</Link>
    </Display>
}