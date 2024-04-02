"use client"

import AdminForm from "@/app/components/admin/CreateProducts/AdminForm"
import { useState, useEffect } from "react"
import MainLayout from "@/app/components/home/main-layout/MainLayout"
import AdminTable from "@/app/components/admin/ProductTable/AdminTable";
import FilterComponent from "@/app/components/admin/FilterComponent";
import { ProductInterface } from "@/app/lib/products/ProductInterface";
import { FilterParams } from "@/app/lib/admin/Filter/FilterType";

export default function Admin() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [showForm, setShowForm] = useState(false); 
    const [products, setProducts] = useState<ProductInterface[]>([]);

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

    useEffect(() => {
        fetchProducts();
    }, []);
    
    const fetchProducts = async (filters: FilterParams = {}) => {
        const query = new URLSearchParams();
        Object.keys(filters).forEach(key => {
            const value = filters[key as keyof FilterParams];
            if (value) {
                query.append(key, value);
            }
        });
        const response = await fetch(`http://localhost:4000/api/filter?${query.toString()}`);
        if (response.ok) {
            const data = await response.json();
            setProducts(data);
        } else {
            console.error('Failed to fetch products');
        }
    };

    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };

    const handleFilterChange = (filters: {} | undefined) => {
        console.log(filters);
        fetchProducts(filters);
    };


    const handleEdit = (productId: number) => {
    
    };
      
      
    const handleRemove = (productId: number) => {
      
    };



    return (
        <>
        <MainLayout isAdmin={isAdmin}>
        <div className="m-6 flex justify-around">
            <div className="text-4xl">
                Administrate Products
            </div>
            <div className="border border-rounded">
                <FilterComponent onFilterChange={handleFilterChange} />
            </div>
            <div>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={toggleFormVisibility}>
                        {showForm ? 'Hide Create Form' : '   Create  Product   '}
                </button>
            </div> 
        </div>
        
        {showForm && 
        <div className=""> 
                <AdminForm/>
        </div>
        }

            <AdminTable 
              products={products} 
              onEdit={handleEdit} 
              onRemove={handleRemove}
            />
        
        </MainLayout>
      </>
    )
}


