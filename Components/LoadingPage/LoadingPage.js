import React from 'react'
import ReactLoading from "react-loading"
import { Spinner } from "reactstrap"

export default function LoadingPage() {
    return (
        <div style={{ height: "80%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Spinner className="spinner" children="" />
        </div>
    )
}
