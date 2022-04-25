import React, { useContext } from "react";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import HomeIcon from '@mui/icons-material/Home';

// const user = JSON.parse(sessionStorage.getItem("userProfile")).id

export const SidebarData = [
    {
        title: "Scheduler",
        icon: <HomeIcon />,
        link: "/"

    },
    {
        title: "Customers",
        icon: <AccountBoxIcon />,
        link: "/customers"

    },
    {
        title: "Schedule",
        icon: <AgricultureIcon />,
        link: `/schedule/${JSON.parse(sessionStorage.getItem("userProfile")).id}`

    },
]