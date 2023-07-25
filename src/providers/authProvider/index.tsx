import React from "react"
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hook";

type Props = {
    children:React.ReactNode
}

export const AuthProvider:React.FC<Props> = ({children}) => {
   const {loading, isSignedIn} = useAuth();
   const path = useLocation().pathname;
   
    if(loading) return <h1>LOADING...</h1>
    if(!loading && !isSignedIn && path !== '/registration' && path !== '/login') {
        console.log('not signed in')
        return <Navigate to={'/registration'}/>
    }
    return <>
        {children}
    </>
}
