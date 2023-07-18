import React from "react"
import { useAuth } from "../../hooks/auth.hook";

type Props = {
    children:React.ReactNode
}

export const AuthProvider:React.FC<Props> = ({children}) => {
   const {loading} = useAuth();
    if(loading) return <h1>LOADING...</h1>
    return <>
        {children}
    </>
}
