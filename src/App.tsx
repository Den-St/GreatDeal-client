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
import { BanProvider } from "./providers/banProvider"
import { AfterPaymentProvider } from "./providers/afterPaymentProvider"
export const App = () => {
  const user = useAppSelector(state => state.user);
  console.log(user)
  useEffect(() => {
    document.title = 'GreatDeal'
  },[]);
  const path = useLocation().pathname;
  
  return (
    <>
      <Normalize/>
      {!path.includes('admin') ? <Layout>
        <AuthProvider>
          <BanProvider>
            <AfterPaymentProvider>
              <RoutesSwitch/>
            </AfterPaymentProvider>
          </BanProvider>
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

