"use client"

import AdminForm from "@/app/components/admin/CreateProducts/AdminForm"
import { useState, useEffect } from "react"
import MainLayout from "@/app/components/home/main-layout/MainLayout"
import AdminTable from "@/app/components/admin/ProductTable/AdminTable";
import FilterComponent from "@/app/components/admin/FilterComponent";
import { ProductInterface } from "@/app/lib/products/ProductInterface";

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

    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };

    const onFilterChange = async (filters: FilterParams) => {
        try {
          const filteredProducts = await fetchFilteredProducts(filters);
          setProducts(filteredProducts);
        } catch (error) {
          console.error("Failed to fetch filtered products:", error);
        }
      };


    return (
        <>
        <MainLayout>
        <div className="m-6 flex justify-around">
            <div className="text-4xl">
                Administrate Products
            </div>
            <div className="border border-rounded">
                <FilterComponent onFilterChange={onFilterChange} />
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

  
const fetchFilteredProducts = async (filters: FilterParams) => {
    const queryParams = new URLSearchParams();
  
    if (filters.brand_name) queryParams.append('brand', filters.brand_name.toString());
    if (filters.section_name) queryParams.append('section', filters.section_name.toString());
    if (filters.min_value) queryParams.append('valueMin', filters.min_value.toString());
    if (filters.max_value) queryParams.append('valueMax', filters.max_value.toString());
  
    const queryString = queryParams.toString();
    const response = await fetch(`/api/products/filter?${queryString}`);
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return response.json();
  };


const handleEdit = (productId: number) => {
    
};


const handleRemove = (productId: number) => {

};