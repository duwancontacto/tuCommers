import React, { useState } from 'react'
import { useRouter } from "next/router"
import { Col } from "reactstrap";
import MenuIcon from '@material-ui/icons/Menu';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export default function NavbarItems() {
    const router = useRouter()
    const [activeMenu, setActiveMenu] = useState(false)


    const optionsMenu = [
        { title: "Nosotros" },
        { title: "Proceso" },
        { title: "Testimonio" },
        { title: "Precios" },
    ]

    return (
        <>
            <Col className="col-6 d-none d-lg-flex col_container title-logo">
                <div className="menu">
                    {optionsMenu.map((element, i) => <div key={i}> <p>{element.title} </p> </div>)}
                </div>
            </Col>
            <Col className="col_container d-none d-lg-flex col-3">
                <button
                    onClick={() => { router.push("/login"); }}
                    className="button-custom button-blue-outline"
                >
                    Ingresar
                </button>
                <button
                    onClick={() => { router.push("/register"); }}
                    className="button-custom button-blue"
                >
                    Registrate
                </button>
            </Col>
            <Col className="col-9 menu-container d-flex d-lg-none">
                <div onClick={() => { setActiveMenu(!activeMenu) }} className="icon-cursor"><MenuIcon /></div>
            </Col>


            {activeMenu && <div className={`menu-mobile-container ${activeMenu && "menu-mobile-container-active"}`}>
                <div className="menu menu-mobile d-block">
                    <div className="menu-options">

                        {optionsMenu.map((element, i) => <div className="option"> <p>{element.title} </p> </div>)}
                    </div>
                    <div className="menu-sign d-flex m-0">
                        <button
                            onClick={() => { router.push("/login"); }}
                            className="button-custom button-blue-outline"
                        >
                            Ingresar
                        </button>
                        <button
                            onClick={() => { router.push("/register"); }}
                            className="button-custom button-blue"
                        >
                            Registrate
                        </button>
                    </div>
                    <div onClick={() => { setActiveMenu(!activeMenu) }} className="icon-cursor icon-delete"><HighlightOffIcon /></div>
                </div>


            </div>}



        </>
    )
}
