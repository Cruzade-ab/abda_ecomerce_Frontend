'use client'
import React, { useState, useEffect } from 'react';
import { ProductInterface } from '../../lib/products/ProductInterface';

import { useRouter } from "next/navigation";

interface ProductCardProps {
    product: ProductInterface;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {


    const [selectedColor, setSelectedColor] = useState<string>('');
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedVariant, setSelectedVariant] = useState(product.products[0]);
    const [hoverImage, setHoverImage] = useState<boolean>(false);
    const [uniqueSizes, setUniqueSizes] = useState<string[]>([]);
    const [uniqueColors, setUniqueColors] = useState<string[]>([]);
    const router = useRouter();

    


    useEffect(() => {
        if (product.products.length > 0) {
            const sizes = new Set(product.products.map(p => p.size.size_name));
            setUniqueSizes(Array.from(sizes));
            const colors = new Set(product.products.map(p => p.color.color_name));
            setUniqueColors(Array.from(colors));

            setSelectedColor(product.products[0].color.color_name);
            setSelectedSize(product.products[0].size.size_name);
            setSelectedVariant(product.products[0]);
        }
    }, [product.products]);

    useEffect(() => {
        const variant = product.products.find(variant =>
            variant.color.color_name === selectedColor && variant.size.size_name === selectedSize
        );
        setSelectedVariant(variant || product.products[0]);
    }, [selectedColor, selectedSize, product.products]);

    const handleColorChange = (color: string) => {
        setSelectedColor(color);
    };

    const handleSizeChange = (size: string) => {
        setSelectedSize(size);
    };

    const handleViewDetails = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/products/addCountMostWanted', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId: selectedVariant.product_id }), // Pass only the product_id
            });
            if (response.ok) {
                console.log('Product variant sent successfully');
            } else {
                console.error('Failed to send product variant to the backend');
            }
        } catch (error) {
            console.error('Error sending product variant to the backend:', error);
        }
    
        localStorage.setItem('selectedProductVariantId', selectedVariant.product_id.toString());
        localStorage.setItem('selectedColorId', selectedVariant.color.color_id.toString());
        console.log(selectedVariant.color.color_id)
        
        router.push('/productDetail');
    };

    const handleAddToCart = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/cart/addToCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', 
                body: JSON.stringify({
                    productId: selectedVariant.product_id,
                    quantity: 1
                })
            });
    
            const data = await response.json(); // Esto convierte la respuesta del servidor en un objeto JSON
            console.log('Response from server:', data); // Aquí se registra la respuesta del servidor
            
            if (response.ok) {
                console.log('Product added to cart successfully');
            } else {
                throw new Error('Failed to add product to cart');
            }
        } catch (error) {
            console.log("Error en last error")
            console.error('Error adding product to cart:', error);
        }
        
    };
    
    

    return (
        <div className="m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
            <div onClick={handleViewDetails} className='cursor-pointer'>
               
                    <div className='mx-3 mt-3 h-90 rounded-xl overflow-clip'
                        onMouseEnter={() => setHoverImage(true)}
                        onMouseLeave={() => setHoverImage(false)}
                    >
                        <img
                            className="object-cover w-full h-full"
                            src={hoverImage ? selectedVariant?.hover_image_url : selectedVariant?.image_url}
                            alt={product.general_product_name}
                        />
                    </div>
                    <div className="px-5 pb-5">
                        <h5 className="text-xl tracking-tight text-slate-900">
                            <span className='font-medium'>
                            {product.general_product_name},  
                            </span>
                            <span className='italic mx-1'>
                            { product.brand.brand_name}
                            </span>
                        </h5>
                    </div>
            </div>
            <div className=" px-5 `">
                <div className="flex items-center justify-between">
                    {/* aquí esta el color del precio por si desean cambiarlo */}
                    <span className="text-3xl font-bold text-green-600 ">
                        ${selectedVariant?.value}
                    </span>
                    <div className='flex items-center justify-between'>
                        <div>
                        <p>Size:</p>
                        <select value={selectedSize} onChange={e => handleSizeChange(e.target.value)}>
                            {uniqueSizes.map(size => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                        </div>
                        <div>
                        <p>Color:</p>
                        <select value={selectedColor} onChange={e => handleColorChange(e.target.value)}>
                            {uniqueColors.map(color => (
                                <option key={color} value={color}>
                                    {color}
                                </option>
                            ))}
                        </select>
                        </div>
                        
                    </div>
                </div>
                <a onClick={handleAddToCart}  href="#" className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to cart</a>
            </div>
        </div>
    );
};

export default ProductCard;