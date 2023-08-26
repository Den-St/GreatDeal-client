import { Spin } from "antd";
import React from "react"
import { Navigate, useLocation } from "react-router-dom";
import { Display } from "../../assets/Display";
import { useAuth } from "../../hooks/auth.hook";

type Props = {
    children:React.ReactNode
}

export const AuthProvider:React.FC<Props> = ({children}) => {
   const {loading, isSignedIn} = useAuth();
   const path = useLocation().pathname;
   
    if(loading) return <Display width="100%" height="90vh" justify="center" align="center"><Spin/></Display>
    if(!loading && !isSignedIn && path !== '/registration' && path !== '/login') {
        return <Navigate to={'/registration'}/>
    }
    return <>
        {children}
    </>
}
