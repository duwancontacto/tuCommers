import React from 'react'
import Sidebar from "../../Components/Sidebar/Sidebar"
import GroupsContent from "../../Components/Dashboard/Groups/GroupsContent"
export default function Groups() {
    return (
        <div className="dashboard">
            <Sidebar />
            <GroupsContent />
        </div>
    )
}
