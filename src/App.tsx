import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { Normalize } from "styled-normalize"
import { Layout } from "./containers/Layout"
import { getCategoriesByName } from "./firebase/db/categories/get/getCategoriesByName"
import { getJobs } from "./firebase/db/jobs/get/getJobs"
import { getUsers } from "./firebase/db/users/get/getUsers"
import { googleAuthProvider } from "./firebase/firebaseInit"
import { RoutesSwitch } from "./helpers/routes"
import { AuthProvider } from "./providers/authProvider"

export const App = () => {
  onAuthStateChanged(googleAuthProvider,() => console.log('xzc',googleAuthProvider.currentUser))
  useEffect(() => {
    // getUsers().then((data) => console.log(data));
    // getJobs().then(a => console.log(a));
    // getCategoriesByName('leaf').then(s => console.log("999",s));
  },[]);

  return (
    <>
      <AuthProvider>
        <Normalize/>
        <Layout>
          <RoutesSwitch/>
        </Layout>
      </AuthProvider>
    </>
  )
}

