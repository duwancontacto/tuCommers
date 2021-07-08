import React from 'react'
import { Col } from "reactstrap";
import NavbarItems from "./NavbarItems"
export default function Navbar() {
    return (
        <nav className="nav_container">
            <div className=" row m-0">
                <Col className="col-3 title-logo">
                    <span> TuCommers</span>{" "}
                </Col>
                <NavbarItems />
            </div>
        </nav>
    )
}
