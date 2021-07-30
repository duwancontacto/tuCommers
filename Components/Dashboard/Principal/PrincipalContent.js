import React, { useContext } from 'react'
import Breadcrumb from "../../Breadcrum/BreadCrum"
import Footer from "../../Footer/Footer"
import { Card } from "reactstrap"

import UserContext from '../../../context/User/UserContext'



export default function DashboardInicio() {

    const { user } = useContext(UserContext)

    console.log(user)

    return (
        <div className="content">
            <Breadcrumb title="Tablero" subtitle="Inicio" />
            <section className="row">
                <div className="col-12 col-md-6 col-lg-4 col-xl-3 pt-3">
                    <Card body className="card-body-content">
                        <section className="content-card-info">
                            <div>
                                <h3 className="card-title">Vistas recibidas hoy:</h3>
                                <p> 105 </p>
                            </div>
                        </section>
                    </Card>
                </div >
                <div className="col-12 col-md-6 col-lg-4   col-xl-3 pt-3">
                    <Card body className="card-body-content">
                        <section className="content-card-info">
                            <div>
                                <h3 className="card-title">Pedidos pendientes:</h3>
                                <p> 12 </p>
                            </div>
                        </section>
                    </Card>
                </div >
                <div className="col-12 col-md-6 col-lg-4   col-xl-3 pt-3">
                    <Card body className="card-body-content">
                        <section className="content-card-info">
                            <div>
                                <h3 className="card-title">Plan activo:</h3>
                                <p> Premium </p>
                            </div>
                        </section>
                    </Card>
                </div >
                <div className="col-12 col-md-6 col-lg-4  col-xl-3  pt-3">
                    <Card body className="card-body-content">
                        <section className="content-card-info">
                            <div>
                                <h3 className="card-title">Nivel de usuario:</h3>
                                <p> {user && user.role} </p>
                            </div>
                        </section>
                    </Card>
                </div >
            </section>

            <section className="row pt-4">
                <div className="col-12 col-lg-12 col-xl-8 pt-3"><Card body >
                    <h3 className="card-title">Todays Income</h3>
                </Card></div>
                <div className="col-12 col-lg-12 col-xl-4 pt-3"><Card body >
                    <h3 className="card-title">Todays Income</h3>
                </Card></div>
            </section>
            <section className="row pt-4">
                <div className="col-12 col-lg-12 col-xl-8 pt-3"><Card body >
                    <h3 className="card-title">Todays Income</h3>
                </Card></div>
                <div className="col-12 col-lg-12 col-xl-4 pt-3"><Card body >
                    <h3 className="card-title">Todays Income</h3>
                </Card></div>
            </section>

            <Footer />


        </div>
    )
}
