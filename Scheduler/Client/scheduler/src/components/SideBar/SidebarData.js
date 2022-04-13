import React from "react";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import HomeIcon from '@mui/icons-material/Home';


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
        link: "/schedule"

    },
]