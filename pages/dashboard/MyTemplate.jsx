import React from 'react'
import Sidebar from "../../Components/Sidebar/Sidebar"
import MyTemplatesContent from "../../Components/Dashboard/MyTemplates/MyTemplatesContent"
export default function MyTemplate() {
    return (
        <div className="dashboard">
            <Sidebar />
            <MyTemplatesContent />
        </div>
    )
}
