"use client"

import AdminForm from "@/app/components/admin/CreateProducts/AdminForm"
import { useState, useEffect } from "react"
import MainLayout from "@/app/components/home/main-layout/MainLayout"
import AdminTable from "@/app/components/admin/ProductTable/AdminTable";
import FilterComponent from "@/app/components/admin/FilterComponent/FilterComponent";
import { ProductInterface } from "@/app/lib/products/ProductInterface";
import { FilterParams } from "@/app/lib/admin/Filter/FilterType";
import Modal from "@/app/components/admin/Modal/Modal";
import EditAdminForm from "@/app/components/admin/CreateProducts/EditAdminForm";

export default function Admin() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [apiUrl, setApiUrl] = useState('http://localhost:4000/api/products/wantedProducts');
    const [sectionName, setSectionName] = useState('Most Wanted Products');

    
    const [selectedProduct, setSelectedProduct] = useState<ProductInterface | null>(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const openEditModal = () => setEditModalOpen(true);
    const handleCloseEditModal = () => setEditModalOpen(false);


    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const openCreateModal = () => setCreateModalOpen(true);
    const handleCloseCreateModal = () => setCreateModalOpen(false);

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
                query.append(key, String(value));
            }
        });
        const url = `http://localhost:4000/api/products/filter?${query.toString()}`
        console.log(url)
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setProducts(data);
        } else {
            console.error('Failed to fetch products');
        }
    };

   

    const handleFilterChange = (filters: {} | undefined) => {
        console.log(filters);
        fetchProducts(filters);
    };


    const handleEdit = (productId: number) => {
        const product = products.find(p => p.general_product_id === productId);
        if(product!) 
        setSelectedProduct(product);
        setEditModalOpen(true);
    
    };
      
      
    const handleRemove = (productId: number) => {
        setEditModalOpen(false);
        setSelectedProduct(null);
    };

    
  const handleCategoryChange = (category: string) => {
    const apiUrlMap = {
      'men': 'http://localhost:4000/api/products/men',
      'women': 'http://localhost:4000/api/products/women',
      'wantedProducts': 'http://localhost:4000/api/products/wantedProducts'
    };

    const sectionNameMap = {
      'men': "Men's Collection",
      'women': "Women's Collection",
      'wantedProducts': "Most Wanted Products"
    };

    const key = category as keyof typeof apiUrlMap; // assert category as a key of apiUrlMap

    // Check if the key exists in the map to ensure type safety
    if (apiUrlMap[key] && sectionNameMap[key]) {
        setApiUrl(apiUrlMap[key]);
        setSectionName(sectionNameMap[key]);
    } else {
        console.error('Invalid category:', category);

    }
  };


    return (
        <>
        <MainLayout isAdmin={isAdmin} onCategoryChange={handleCategoryChange}>
        <div className="m-6 flex justify-around">
            <div className="text-4xl">
                Administrate Products
            </div>
            <div className="border border-rounded">
                <FilterComponent onFilterChange={handleFilterChange} />
            </div>
            <div className="">
                <Modal  isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} >
                <AdminForm  onSubmitSuccess={handleCloseCreateModal}
                handleCloseEditModal={handleCloseCreateModal} />
                </Modal>
            </div>
            <div>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={openCreateModal}>
                    Create  Product
                </button>
            </div> 
        </div>

            <AdminTable 
              products={products} 
              onEdit={handleEdit} 
              onRemove={handleRemove}
            />

                <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
                    {selectedProduct && (
                        <EditAdminForm
                            product={selectedProduct}  // Pass the selected product to the form
                            onSubmitSuccess={handleCloseEditModal}
                            handleCloseEditModal={handleCloseEditModal}
                        />
                    )}
                </Modal>
        
        </MainLayout>
      </>
    )
}


