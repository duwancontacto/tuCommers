import React from 'react'
import Sidebar from "../../Components/Sidebar/Sidebar"
import Principal from "../../Components/Dashboard/Principal/PrincipalContent"
export default function Dashboard() {
    return (
        <div className="dashboard">
            <Sidebar />
            <Principal />
        </div>
    )
}
