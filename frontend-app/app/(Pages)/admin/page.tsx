"use client"

import AdminForm from "@/app/components/admin/AdminForm"
import Banner from "@/app/components/home/banner/banner1";
import Navbar from "@/app/components/home/navBar/Navbar"
import ProductsContainer from "@/app/components/products/ProductContainer";
import { useState, useEffect } from "react"
import MainLayout from "@/app/components/home/main-layout/MainLayout"
import AdminTable from "@/app/components/admin/ProductTable/AdminTable";
import FilterComponent from "@/app/components/admin/FilterComponent/FilterComponent";
import { ProductInterface } from "@/app/lib/products/ProductInterface";
import { FilterParams } from "@/app/lib/admin/Filter/FilterType";

export default function Admin() {
    const [message, setMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const [apiUrl, setApiUrl] = useState('http://localhost:4000/api/products/getAllProducts');
    const [sectionName, setSectionName] = useState('Most Wanted Products');


    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('http://localhost:4000/api/user/getUser', {
                    credentials: "include",
                });
                if (response.ok) {
                    const content = await response.json();
                    setMessage(`${content.name} ${content.last_name} is logged in with an email: ${content.email}. Its roles is the # ${content.role_id}`);
                    setIsLoggedIn(true);
                    setIsAdmin(content.role_id === 2);
                    console.log(content);
                } else {
                    setIsLoggedIn(false);
                    setIsAdmin(false);
                    setMessage('You need to log in.');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsLoggedIn(false);
                setIsAdmin(false);
                setMessage('You need to log in.');
            }
        })();
    }, []);

    const handleCategoryChange = (category: string) => {
        setApiUrl(`http://localhost:4000/api/products/${category}`);
        setSectionName(category === 'men' ? 'Men\'s Collection' : 'Women\'s Collection');
    };


    return (
        <>
        <Navbar onCategoryChange={handleCategoryChange} isAdmin={isAdmin}/>
        <div className="my-4">
        <p className="text-center">
          {isLoggedIn ? message : 'You need to log in.'}
        </p>
        </div>
        <div className="my-4">
        <AdminForm></AdminForm>

        </div>
      </>
    )
}