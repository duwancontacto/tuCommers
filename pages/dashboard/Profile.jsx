import React from 'react'
import Sidebar from "../../Components/Sidebar/Sidebar"
import ProfileContent from "../../Components/Dashboard/Profile/ProfileContent"
export default function Profile() {
    return (
        <div className="dashboard">
            <Sidebar />
            <ProfileContent />
        </div>
    )
}
