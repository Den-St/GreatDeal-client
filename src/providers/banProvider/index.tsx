import { Spin, Tag } from "antd";
import { Display } from "../../assets/Display";
import { useAppSelector } from "../../hooks/redux"

type Props = {
    children:React.ReactNode
}

export const BanProvider:React.FC<Props> = ({children}) => {
    const isBanned = useAppSelector(user => user.user.isBanned);

    if(isBanned === null) return <Display width="100%" height="90vh" justify="center" align="center"><Spin/></Display>
    if(isBanned) return <Display background="#e63b3be6" width="100%" height="100vh" justify="center" align="center"><Tag color={'error'}>BANNED</Tag></Display>;
    return <>{children}</>
}