import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/User/UserContext'
import ThemeContext from "../../context/Theme/ThemeContext";
import { useRouter } from "next/router"

import jwt from "jsonwebtoken"
import petition_get from "../../utils/petitions/petition_get"


export default function PrivateRoutes({ children, jwtPassword }) {

    const router = useRouter()
    const [activeComponent, setActiveComponent] = useState(false)
    const [loading, setLoading] = useState(true)

    const [activeRender, setActiveRender] = useState(false)

    const { changeUser } = useContext(UserContext)
    const { changeTheme } = useContext(ThemeContext)



    const getRoutePrivate = () => {
        if (window.location.pathname !== "/login" && window.location.pathname !== "/forgotPassword" && window.location.pathname !== "/restartPassword" && window.location.pathname !== "/register" && window.location.pathname !== "/") {
            return true
        }
        return false
    }

    useEffect(() => {

        ///Get Data of user
        if (activeRender) {
            setLoading(false)
            petition_get("getDataUser")
                .then((result) => {
                    changeTheme(result.data.data.theme === "dark" ? "dark" : "default");
                    setLoading(true)
                })
                .catch((error) => { setLoading(true); })
        } else {
            changeTheme("default");
        }


        //Get Permissions of route private
        setActiveComponent(false)
        if (!jwtPassword) return

        const userAuth = JSON.parse(localStorage.getItem("userAuth"))

        if (!userAuth && !getRoutePrivate()) return setActiveComponent(true)
        else if (!userAuth && getRoutePrivate) return router.push("/")

        try {
            let jwtValid = jwt.verify(userAuth.token, jwtPassword)
            let dateTime = Math.floor((Date.now()) / 1000)
            if (getRoutePrivate()) {
                if (jwtValid.exp < dateTime) {
                    localStorage.removeItem("userAuth")
                    return router.push("/")
                }
                else changeUser(jwtValid)
            } else if (jwtValid.exp > dateTime) {
                if (jwtValid.registerComplete) return router.push("/dashboard")
                router.push("/form")

            }
        } catch (error) {
            if (error.message === "jwt expired") {
                localStorage.removeItem("userAuth")
                return router.push("/")
            }
        }
        setActiveComponent(true)

    }, [activeRender, jwtPassword])

    useEffect(() => {
        setActiveRender(getRoutePrivate)
    }, [router])

    return (
        <>
            {loading && activeComponent && children}
        </>
    )
}



