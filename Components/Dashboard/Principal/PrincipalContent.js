import React from 'react'
import Breadcrumb from "../../Breadcrum/BreadCrum"
import Footer from "../../Footer/Footer"
import { Card } from "reactstrap"

export default function DashboardInicio() {
    return (
        <div className="content">
            <Breadcrumb title="Tablero" subtitle="Inicio" />
            <section className="row">
                <div className="col-12 col-md-6 col-lg-4 col-xl-3 pt-3">
                    <Card body >
                        <h3 className="card-title">Todays Income</h3>
                    </Card>
                </div >
                <div className="col-12 col-md-6 col-lg-4 col-xl-3 pt-3">
                    <Card body >
                        <h3 className="card-title">Todays Income</h3>
                    </Card>
                </div >
                <div className="col-12 col-md-6 col-lg-4 col-xl-3 pt-3">
                    <Card body >
                        <h3 className="card-title">Todays Income</h3>
                    </Card>
                </div >
                <div className="col-12 col-md-6 col-lg-4 col-xl-3 pt-3">
                    <Card body >
                        <h3 className="card-title">Todays Income</h3>
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
