import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { SidebarData } from './SidebarData';


export const SideBar = () => {
  const navigate = useNavigate()
  
  return (
    <div lang='eng' className="sidebar">
      <ul className='sidebarList'>
        {SidebarData.map((val, key) => {
          return( <li
            key={key}
            className={`row ${val.title}`}
            // set current row to active for highlighting 
            id={window.location.pathname === val.link ? "active" : ""}
            onClick={() => { navigate(val.link) }}>
            <div id='icon'>{val.icon}</div>
            <div id='title'>{val.title}</div>
          </li>
          )
        })
        }
      </ul>
    </div>
  )
}