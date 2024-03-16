"use client"
import Banner from "@/app/components/home/banner/banner1"
import Navbar from "@/app/components/home/navBar/Navbar"
import ProductsContainer from "@/app/components/Producto/ProductContainer"

export default function Men(){
    return (<>
        <Navbar/>
        <Banner/>
        <ProductsContainer apiUrl="http://localhost:4000/api/products/sendProducts" section_name="Men Products"/>
        </>
    )
}