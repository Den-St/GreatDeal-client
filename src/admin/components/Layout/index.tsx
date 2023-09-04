import { ReactNode } from "react"
import { Display } from "../../../assets/Display"
import { SideMenu } from "../SideMenu"

export const AdminPanelLayout:React.FC<{children:ReactNode}> = ({children}) => {
    return <Display width="100vw" height="100%"  padding="0 0 0 20%">
        <Display position="fixed" top={'0'} left={'0'} width="20%" height="100%">
            <SideMenu/>
        </Display>
        <Display background="#2b3145" width="100%" minHeight={'100vh'} padding="15px" height="100%">
            {children}
        </Display>
    </Display>
}
