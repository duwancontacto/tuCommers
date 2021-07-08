import React from 'react'
import Sidebar from "../../Components/Sidebar/Sidebar"
import MessagesContent from "../../Components/Dashboard/Messages/MessagesContent"
export default function Messages() {
    return (
        <div className="dashboard">
            <Sidebar />
            <MessagesContent />
        </div>
    )
}
