"use client"
import React, { useEffect, useState } from 'react';
import { ProductInterface, ColorInterface, ProductVariant } from '../../lib/products/ProductInterface';
import MainLayout from '@/app/components/home/main-layout/MainLayout';
const ProductDetailPage: React.FC = () => {
    const [product, setProduct] = useState<ProductInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedColor, setSelectedColor] = useState<ColorInterface | null>(null);
    const [dropdownOpen, setdropdownOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState<string>('');
    useEffect(() => {
        const fetchProduct = async () => {
            const productVariantId = localStorage.getItem('selectedProductVariantId');
    
            if (!productVariantId) {
                console.error('Product variant ID not found in localStorage');
                setLoading(false);
                return;
            }
    
            try {
                const response = await fetch('http://localhost:4000/api/products/getProductById', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ productVariantId }),
                });
    
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
    
                const data = await response.json();
                console.log("Fetched data:", data); 
    
                if (data && Array.isArray(data) && data.length > 0) {
                    setProduct(data[0]); 
                    // Seleccionar el primer color cuando se cargue el producto
                    setSelectedColor(data[0]?.products[0]?.color || null);

                    
                } else {
                    console.error('Product data is not in expected format:', data);
                    setProduct(null);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchProduct();
    }, []);
    
    const handleColorChange = (color: ColorInterface) => {
        setSelectedColor(color);
        setdropdownOpen(false);
    };
   
    const handleSizeChange = (size: string) => {
        setSelectedSize(size);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Error fetching product details</div>;
    }

    console.log("General product name is: ", product.general_product_name);
    
    const renderColorOptions = () => {
        return (
            <div className="relative">
                <button
                    type="button"
                    className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    id="menu-button"
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                    onClick={() => setdropdownOpen(!dropdownOpen)}
                >
                    {selectedColor ? selectedColor.color_name : 'Select Color'}
                </button>
                {dropdownOpen && (
                    <div className="absolute z-10 mt-2 bg-white shadow-lg rounded-md">
                        {product.products.map((variant, index) => (
                            <button
                                key={index}
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => handleColorChange(variant.color)}
                            >
                                {variant.color.color_name}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    }

       

   
    const selectedProductVariant = product.products.find((variant) => variant.color.color_id === selectedColor?.color_id);

    return (
       <>
        <MainLayout children={undefined} isAdmin={false} onCategoryChange={(_category: string) => {}}/>
        <div className="container mx-auto">
            <div className='flex flex-wrap gap-4'>
                <div className='grid gap-4 grid-cols-2'>
                    <img
                        className='rounded-lg border border-transparent shadow-xl'
                        src={selectedProductVariant ? selectedProductVariant.image_url : ''}
                        alt={`Image of ${selectedProductVariant ? selectedProductVariant.color.color_name : ''}`}
                    />
                    <img
                        className="rounded-lg border border-transparent shadow-xl"
                        src={selectedProductVariant ? selectedProductVariant.hover_image_url : ''}
                        alt={`Image of ${selectedProductVariant ? selectedProductVariant.color.color_name : ''}`}
                    />
                </div>
                <div className='flex-1 p-4 rounded-lg border border-gray-200'>
                    <div className='text-sm'>
                        <p>{product.section.section_name}</p>
                    </div>
                    <div className='text-2xl'>
                        <h1>{product.general_product_name}</h1>
                    </div>
                    <div className='py-3 text-base'>
                        <p>{product.description}</p>
                    </div>
                    <div className='text-3xl'>
                        <p>${selectedProductVariant ? selectedProductVariant.value : ''}</p>
                    </div>
                    <div className="py-3 inline-block text-left">
                        <h2>Select Color:</h2>
                        <div className="flex">
                            {renderColorOptions()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default ProductDetailPage;