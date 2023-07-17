import { UserI } from './../types/user.type';
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { googleAuthProvider } from "../firebase/firebaseInit";
import { setUser } from "../store/userSlice";
import { useAppDispacth, useAppSelector } from "./redux";
import { getUserByEmail } from '../firebase/db/users/get/getUserByEmail';

export const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispacth();
    const user = useAppSelector(state => state.user);

    useEffect(() => {
        onAuthStateChanged(googleAuthProvider,async () => {
            if(!googleAuthProvider.currentUser) {
                setLoading(false);
                return;
            }

            const user = await getUserByEmail(googleAuthProvider.currentUser?.email);

            const userDataGoogle:UserI = {
                email:googleAuthProvider.currentUser?.email,
                displayName:googleAuthProvider.currentUser?.displayName,
                createdAt:googleAuthProvider.currentUser?.metadata.creationTime,
                photoURL:googleAuthProvider.currentUser?.photoURL
            }
            dispatch(setUser({
                ...userDataGoogle,...user
            }));
        });
        setLoading(false);
        console.log('user',user);
    },[]);

    return {loading};
}