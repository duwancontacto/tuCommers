import React from 'react'
import Sidebar from "../../Components/Sidebar/Sidebar"
import MyProductsContent from "../../Components/Dashboard/MyProducts/MyProductsContent"
export default function MyProducts() {
    return (
        <div className="dashboard">
            <Sidebar />
            <MyProductsContent />
        </div>
    )
}
