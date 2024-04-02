"use client"

import AdminForm from "@/app/components/admin/CreateProducts/AdminForm"
import { useState, useEffect } from "react"
import MainLayout from "@/app/components/home/main-layout/MainLayout"


export default function Admin() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [apiUrl, setApiUrl] = useState('http://localhost:4000/api/products/getAllProducts');
    const [showForm, setShowForm] = useState(false); 
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

    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };

    const handleCategoryChange = (category: string) => {
        setApiUrl(`http://localhost:4000/api/products/${category}`);
        setSectionName(category === 'men' ? 'Men\'s Collection' : 'Women\'s Collection');
    };

    return (
        <>
        <MainLayout>
        <div className="m-6 flex justify-around">
            <div className="text-4xl">
                Administrate Products
            </div>
            <div className="border border-rounded">
                Filter: 
            </div>
            <div>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={toggleFormVisibility}>
                        {showForm ? 'Hide Create Product Form' : 'Create Product'}
                </button>
            </div> 
        </div>
        
        {showForm && 
        <div className="border-2 border-rounded"> 
                <AdminForm/>
        </div>
        }
        
        </MainLayout>
      </>
    )
}