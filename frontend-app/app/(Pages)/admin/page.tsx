"use client"

import AdminForm from "@/app/components/admin/AdminForm"
import { useState, useEffect } from "react"
import MainLayout from "@/app/components/home/main-layout/MainLayout"


export default function Admin() {
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
                    setIsAdmin(content.role_id === 2);
                    console.log(content);
                } else {
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsAdmin(false);
            }
        })();
    }, []);


    const handleCategoryChange = (category: string) => {
        setApiUrl(`http://localhost:4000/api/products/${category}`);
        setSectionName(category === 'men' ? 'Men\'s Collection' : 'Women\'s Collection');
    };

    return (
        <>
        <MainLayout>
        <h1>
            Administrate Products
        </h1>
        <div className="my-4">
        <AdminForm></AdminForm>
        </div>
        </MainLayout>
      </>
    )
}