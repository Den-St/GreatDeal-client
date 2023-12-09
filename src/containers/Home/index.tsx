import { useEffect } from "react";
import { HomeComponent } from "../../components/Home"

export const Home = () => {
    useEffect(() => {
        document.title = "Great Deal";
    },[])
    return <HomeComponent/>
}