import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react"
import { googleAuthProvider } from "../../firebase/firebaseInit";
import { useAuth } from "../../hooks/auth.hook";
import { useAppDispacth, useAppSelector } from "../../hooks/redux";
import { setUser } from "../../store/userSlice";

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
