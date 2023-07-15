import { Normalize } from "styled-normalize"
import { Layout } from "./containers/Layout"
import { RoutesSwitch } from "./helpers/routes"

export const App = () => {
  return (
    <>
     <Normalize/>
     <Layout>
      <RoutesSwitch/>
     </Layout>
    </>
  )
}

