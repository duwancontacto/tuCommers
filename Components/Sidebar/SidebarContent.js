import React, { useState, useContext } from 'react'
import SidebarItem from './SidebarItem'
import ThemeButton from "../ThemeButton/ThemeButton"

import DashboardIcon from '@material-ui/icons/Dashboard';
import ForumIcon from '@material-ui/icons/Forum';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DescriptionIcon from '@material-ui/icons/Description';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import StorefrontIcon from '@material-ui/icons/Storefront';
import UserContext from '../../context/User/UserContext';
export default function SidebarContent() {

    const { user } = useContext(UserContext)


    const items = [
        {
            title: "",
            content: [
                { name: "Inicio", route: "/dashboard", icon: <DashboardIcon /> },
                { name: "Mensajes", route: "/dashboard/Messages", icon: <ForumIcon /> },
                { name: "Estadisticas", route: "/dashboard/Statistics", icon: <EqualizerIcon /> },
            ]
        },
        {
            title: "Settings", content: [
                { name: "Perfil", route: "/dashboard/Profile", icon: <PersonIcon /> },
                { name: "Grupo de Usuarios", route: "/dashboard/Groups", icon: <PersonIcon />, type: "restricted" },
            ]
        },
        {
            title: "Pagina Web",
            content: [
                { name: "Mi Plantilla", route: "/dashboard/MyTemplate", icon: <DescriptionIcon /> },
                { name: "Mis Productos", route: "/dashboard/MyProducts", icon: <LocalGroceryStoreIcon /> },
                { name: "Plantillas Disponibles", route: "/dashboard/Templates", icon: <StorefrontIcon /> },

            ]
        },
        {
            content: [
                { name: "Cerrar Sesion", route: "/logout", icon: <ExitToAppIcon /> },
            ]
        }
    ]


    return (
        <div>
            <div className="sidebar-container">
                <div className="row sidebar-header pt-4 ">
                    <div className=" col-3 p-0 m-0   ">
                        <div className="sidebar-image"></div>
                    </div>
                    <div className=" col-9 p-0 sidebar-name"> {user && user.personalData[0].names} {user && user.personalData[0].lastNames} </div>
                </div>
            </div>

            {items.map((element, index) =>
                <div key={index} className="sidebar-container">
                    {element.title && <p className="sidebar-subtitle">{element.title}</p>}
                    {element.content.map((elementTwo, i) => (elementTwo.type && user && user.role === "Admin" || !elementTwo.type) && <SidebarItem key={i} element={elementTwo} />)}
                </div>)}
        </div>
    )
}
