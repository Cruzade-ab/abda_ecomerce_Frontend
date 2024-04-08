"use client"

import Navbar from "@/app/components/home/navBar/Navbar"
import { useState, useEffect } from "react"

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

    const handleLogout = async () => {
        try {
            // Make a request to the backend logout endpoint
            const response = await fetch('http://localhost:4000/api/user/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                console.log('Logout successful');
                setIsLoggedIn(false);
                window.location.href = '/';

            } else {
                console.error('Logout failed:', await response.text());
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };


    return (
        <>

            <Navbar onCategoryChange={handleCategoryChange} isAdmin={isAdmin} />
            <div className="mt-20">
                <p className="text-center">
                    {isLoggedIn ? message : 'You need to log in.'}
                </p>
            </div>
            <div className="my-y">

                <button onClick={handleLogout} className="logout-button">
                    Log Out
                </button>

            </div>

        </>
    )
}