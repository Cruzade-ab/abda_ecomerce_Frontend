"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { ProductInterface, ColorInterface, ProductVariant } from '../../lib/products/ProductInterface';
import MainLayout from '@/app/components/home/main-layout/MainLayout';

const ProductDetailPage: React.FC = () => {
    const [product, setProduct] = useState<ProductInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedColor, setSelectedColor] = useState<ColorInterface | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
    const [availableQuantity, setAvailableQuantity] = useState<number>(0);
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
    const productColor = localStorage.getItem('selectedColorId');
    const [uniqueColors, setUniqueColors] = useState<ColorInterface[]>([]);



    //Is Admin MainLayout Logic 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
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
                if (data && Array.isArray(data) && data.length > 0) {
                    const initialProduct: ProductInterface = data[0];
                    setProduct(initialProduct);
    
                    const storedColorId = parseInt(localStorage.getItem('selectedColorId') || '0');
                    const initialVariant = initialProduct.products.find(p => p.color.color_id === storedColorId) || initialProduct.products[0];
                    setSelectedVariant(initialVariant);
                    setSelectedColor(initialVariant.color);
                    setSelectedSize(initialVariant.size.size_name);
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

    const handleColorChange = useCallback((color: ColorInterface) => {
        const newVariant = product?.products.find(p => p.color.color_id === color.color_id && p.size.size_name === selectedSize);
        if (newVariant) {
            setSelectedVariant(newVariant);
            setSelectedColor(color);
        }
    }, [product, selectedSize]);

    const handleSizeChange = useCallback((size: string) => {
        const newVariant = product?.products.find(p => p.size.size_name === size && p.color.color_id === selectedColor?.color_id);
        if (newVariant) {
            setSelectedVariant(newVariant);
            setSelectedSize(size);
        }
        console.log(size)
    }, [product, selectedColor]);

    useEffect(() => {
        if (product) {
            // Crear un nuevo Map para almacenar solo colores únicos
            const colorMap = new Map<number, ColorInterface>();
            product.products.forEach(variant => {
                if (!colorMap.has(variant.color.color_id)) {
                    colorMap.set(variant.color.color_id, variant.color);
                }
            });
            // Convertir el Map a un arreglo de valores y actualizar el estado
            setUniqueColors(Array.from(colorMap.values()));
        }
    }, [product]);
    
    



    const handleIncrement = () => {
        if (selectedQuantity < Math.min(5, availableQuantity)) {
            setSelectedQuantity(selectedQuantity + 1);
        }
    };

    const handleDecrement = () => {
        if (selectedQuantity > 1) {
            setSelectedQuantity(selectedQuantity - 1);
        }
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value >= 1 && value <= 5 && value <= availableQuantity) {
            setSelectedQuantity(value);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Error fetching product details</div>;
    }

    const selectedProductVariant = product.products.find((variant) =>
        variant.color.color_id === selectedColor?.color_id && variant.size.size_name === selectedSize
    );
    console.log("General product name is: ", product.general_product_name);
    console.log('Color is',productColor)

    const renderColorOptions = () => {
        return (
            <div className="relative">
                <button
                    type="button"
                    className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    id="menu-button"
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    {selectedColor ? selectedColor.color_name : 'Select Color'}
                </button>
                {dropdownOpen && uniqueColors.length > 0 && (
                    <div className="absolute z-10 mt-2 bg-white shadow-lg rounded-md">
                        {uniqueColors.map((color, index) => (
                            <button
                                key={index}
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => handleColorChange(color)}
                            >
                                {color.color_name}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    }
    


    return (
        <>
            <MainLayout children={undefined} isAdmin={ isAdmin} onCategoryChange={(_category: string) => { }} />
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
                            <div className="py-3 inline-block text-left">
                                <h2>Select Size:</h2>
                                <div className="flex">
                                    <button
                                        className="block px-4 py-2 text-sm text-gray-700 bg-gray-200 hover:bg-gray-300"
                                        onClick={() => handleSizeChange('Small')}
                                    >
                                        Small
                                    </button>
                                    <button
                                        className="block px-4 py-2 text-sm text-gray-700 bg-gray-200 hover:bg-gray-300"
                                        onClick={() => handleSizeChange('Medium')}
                                    >
                                        Medium
                                    </button>
                                    <button
                                        className="block px-4 py-2 text-sm text-gray-700 bg-gray-200 hover:bg-gray-300"
                                        onClick={() => handleSizeChange('Large')}
                                    >
                                        Large
                                    </button>
                                    <button
                                        className="block px-4 py-2 text-sm text-gray-700 bg-gray-200 hover:bg-gray-300"
                                        onClick={() => handleSizeChange('XLarge')}
                                    >
                                        XLarge
                                    </button>
                                </div>
                            </div>




                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={handleDecrement}
                                className="px-3 py-1 mr-2 text-sm bg-gray-200 rounded-full"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={selectedQuantity}
                                onChange={handleQuantityChange}
                                min={1}
                                max={Math.min(5, availableQuantity)}
                                className="block w-24 px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md"
                            />
                            <button
                                onClick={handleIncrement}
                                className="px-3 py-1 ml-2 text-sm bg-gray-200 rounded-full"
                            >
                                +
                            </button>

                            
                        </div>
                        <a href="#" className="flex mt-8 items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Add to cart</a>
                    </div>


                </div>
            </div>
        </>
    );
};

export default ProductDetailPage;

