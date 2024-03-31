"use client"

import Navbar from "@/app/components/home/navBar/Navbar"
import { useState, useEffect } from "react";
export default function Search() {


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
                    setIsLoggedIn(true);
                    setIsAdmin(content.role_id === 2);
                    console.log(content);
                } else {
                    setIsLoggedIn(false);
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsLoggedIn(false);
                setIsAdmin(false);
            }
        })();
    }, []);

    const handleCategoryChange = (category: string) => {
        setApiUrl(`http://localhost:4000/api/products/${category}`);
        setSectionName(category === 'men' ? 'Men\'s Collection' : 'Women\'s Collection');
    };
    return (
        <Navbar onCategoryChange={handleCategoryChange} isAdmin={isAdmin} />

    )
}