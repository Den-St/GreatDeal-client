import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { Normalize } from "styled-normalize"
import { Layout } from "./containers/Layout"
import { getCategoriesByName } from "./firebase/db/categories/get/getCategoriesByName"
import { getJobs } from "./firebase/db/jobs/get/getJobs"
import { getUsers } from "./firebase/db/users/get/getUsers"
import { googleAuthProvider } from "./firebase/firebaseInit"
import { RoutesSwitch } from "./consts/routes"
import { useAppSelector } from "./hooks/redux"
import { AuthProvider } from "./providers/authProvider"
import "./styles.css";
import { AdminRoutesSwitch } from "./admin/routes"
import { useLocation, useParams } from "react-router-dom"
import { AdminPanelLayout } from "./admin/components/Layout"
export const App = () => {
  // onAuthStateChanged(googleAuthProvider,() => console.log('authed user',googleAuthProvider.currentUser))
  const user = useAppSelector(state => state.user);
  console.log(user)
  useEffect(() => {
    document.title = 'GreatDeal'
    // getUsers().then((data) => console.log(data));
    // getJobs().then(a => console.log(a));
    // getCategoriesByName('leaf').then(s => console.log("999",s));
  },[]);
  const path = useLocation().pathname;
  
  return (
    <>
      <Normalize/>
      {!path.includes('admin') ? <Layout>
        <AuthProvider>
          <RoutesSwitch/>
        </AuthProvider>
      </Layout>
      : <AdminPanelLayout>
          <AuthProvider>
            <AdminRoutesSwitch/>
          </AuthProvider>
        </AdminPanelLayout>}
    </>
  )
}

