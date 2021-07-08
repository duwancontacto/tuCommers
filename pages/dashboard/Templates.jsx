import React from 'react'
import Sidebar from "../../Components/Sidebar/Sidebar"
import TemplatesContent from "../../Components/Dashboard/Templates/TemplatesContent"
export default function Templates() {
    return (
        <div className="dashboard">
            <Sidebar />
            <TemplatesContent />
        </div>
    )
}
