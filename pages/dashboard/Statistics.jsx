import React from 'react'
import Sidebar from "../../Components/Sidebar/Sidebar"
import StatisticsContent from "../../Components/Dashboard/Statistics/StatisticsContent"
export default function Statistics() {
    return (
        <div className="dashboard">
            <Sidebar />
            <StatisticsContent />
        </div>
    )
}
