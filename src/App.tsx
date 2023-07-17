import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { Normalize } from "styled-normalize"
import { Layout } from "./containers/Layout"
import { getUsers } from "./firebase/db/users/get/getUsers"
import { googleAuthProvider } from "./firebase/firebaseInit"
import { RoutesSwitch } from "./helpers/routes"
import { AuthProvider } from "./providers/authProvider"

export const App = () => {
  onAuthStateChanged(googleAuthProvider,() => console.log('xzc',googleAuthProvider.currentUser))
  useEffect(() => {
    getUsers().then((data) => console.log(data));
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

