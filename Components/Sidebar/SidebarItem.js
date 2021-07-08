import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router"
export default function SidebarItem({ element }) {
    const [active, setActive] = useState(false)

    useEffect(() => {
        if (window.location.pathname === element.route) setActive(true)
    }, [])


    const route = useRouter()


    const handleClick = () => {
        if (element.route === "/logout") {
            localStorage.removeItem("userAuth")
            return route.push("/")
        }
        if (element.route !== window.location.pathname) route.push(element.route)

    }

    return (
        <div className={`sidebar-item ${active && "sidebar-item-active"}`} onClick={handleClick}>
            {element.icon} <p>{element.name}</p>
        </div>
    )
}
