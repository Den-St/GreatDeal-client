import { Menu, MenuProps } from "antd"
import { Display } from "../../../assets/Display"
import {NotificationOutlined, UserOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom";

export const SideMenu = () => {
    type MenuItem = Required<MenuProps>['items'][number];
    
    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group',
      ): MenuItem {
        return {
          key,
          icon,
          children,
          label,
          type,
        } as MenuItem;
      }
      
      const items: MenuProps['items'] = [
        getItem('Reports', 'sub1', <NotificationOutlined />,[
            getItem(<Link to={'/admin/userReports'}>User reports</Link>,'1',<UserOutlined />),
            getItem(<Link to={'/admin/jobReports'}>Job reports</Link>,'2')
        ]),
        getItem(<Link to={'/admin/users'}>User reports</Link>, '3', <UserOutlined />),
      ];
      
    return <Menu
            theme="dark"
            style={{ width: '100%' }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />
}