import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/User/UserContext'
import SidebarContent from "./SidebarContent"
import MenuIcon from '@material-ui/icons/Menu';
export default function Sidebar() {

    const { menu, changeMenu } = useContext(UserContext)


    const handleChangeMenu = () => {
        changeMenu(!menu)
    }

    useEffect(() => {

        if (menu) return document.getElementsByClassName("dashboard")[0].className = "dashboard dashboard-collapse"
        document.getElementsByClassName("dashboard")[0].className = "dashboard"

    }, [menu])

    return (
        <>
            <div className="sidebar">
                <SidebarContent />
                <div className="sidebar-close">
                    <button onClick={handleChangeMenu} > <MenuIcon /> </button>
                </div>

            </div>
            {menu && <div className="sidebar-open">
                <button onClick={handleChangeMenu} > <MenuIcon /> </button>
            </div>
            }


        </>

    )
}
