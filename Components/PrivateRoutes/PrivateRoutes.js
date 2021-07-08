import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/User/UserContext'
import ThemeContext from "../../context/Theme/ThemeContext";
import { useRouter } from "next/router"

import jwt from "jsonwebtoken"
import petition_get from "../../utils/petitions/petition_get"
import { useToasts } from 'react-toast-notifications';

export default function PrivateRoutes({ children, jwtPassword }) {

    const router = useRouter()
    const { addToast } = useToasts();
    const [activeComponent, setActiveComponent] = useState(false)
    const [loading, setLoading] = useState(true)

    const { changeUser } = useContext(UserContext)
    const { changeTheme } = useContext(ThemeContext)



    const getRoutePrivate = () => {
        if (window.location.pathname !== "/login" && window.location.pathname !== "/forgotPassword" && window.location.pathname !== "/restartPassword" && window.location.pathname !== "/register" && window.location.pathname !== "/") {
            return true
        }
        return false
    }

    useEffect(() => {
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

    }, [router, jwtPassword])

    useEffect(() => {
        if (getRoutePrivate()) {
            setLoading(false)
            petition_get("getDataUser")
                .then((result) => {
                    setLoading(true)
                    changeTheme(result.data.data.theme === "dark" ? "dark" : "default");
                })
                .catch((error) => { setLoading(true); if (error.response) return addToast(error.response.data.data, { appearance: 'error', autoDismiss: true, }); })
        } else {
            changeTheme("default");
        }
    }, [router])

    return (
        <>
            {loading && activeComponent && children}
        </>
    )
}



