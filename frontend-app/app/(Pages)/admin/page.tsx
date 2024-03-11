"use client"

import AdminForm from "@/app/components/admin/AdminForm"
import Navbar from "@/app/components/home/navBar/Navbar"

export default function Admin (){
    return(
        <>
        <h1 className="w-full bg-black text-white text-center">Esta pagina es para crear Productos</h1>
        <AdminForm/>
        </>
    )
}