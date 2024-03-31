'use client'
import React, { useState, useEffect } from 'react';
import { ProductInterface, ProductVariant } from '../../lib/products/ProductInterface';

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

    const handleViewDetails = () => {
        localStorage.setItem('selectedProductVariantId', selectedVariant.product_id.toString());
        router.push('/productDetail');
    };


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


    return (
        <div className="m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
            <div onClick={handleViewDetails} className='cursor-pointer'>
               
                    <div className='mx-3 mt-3 h-60 rounded-xl overflow-clip'
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
                            {product.general_product_name}, {product.brand.brand_name}
                        </h5>
                    </div>
               
            </div>
            <div className="mt-4 px-5 pb-5">
                <div className="mt-2 mb-5 flex items-center justify-between">
                    <span className="text-3xl font-bold text-slate-900">
                        ${selectedVariant?.value}
                    </span>
                    <div>
                        <p>Size:</p>
                        <select value={selectedSize} onChange={e => handleSizeChange(e.target.value)}>
                            {uniqueSizes.map(size => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
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
                <button className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                    Add to cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;