import React, { useState, useEffect } from 'react';
import { ProductInterface, ProductVariant } from './ProductInterface';

interface ProductCardProps {
    product: ProductInterface;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>();

    // Set the selected variant to the first product object on component mount
    useEffect(() => {
        setSelectedVariant(product.products[0]);
    }, [product.products]);

    const handleColorChange = (color: string) => {
        setSelectedColor(color);
        const variant = product.products.find(variant => variant.color.color_name === color);
        setSelectedVariant(variant);
    };

    const handleSizeChange = (size: string) => {
        setSelectedColor(size);
        const variant = product.products.find(variant => variant.size.size_name === size);
        setSelectedVariant(variant);
    };

    return (
        <div className="m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
            
            <div className='mx-3 mt-3 h-60 rounded-xl overflow-clip'>
                <img className="object-cover w-full h-full" src={selectedVariant?.image_url || ''} alt={product.general_product_name} /> 
            </div>
            <div className="mt-4 px-5 pb-5">
                <a href="#">
                    <h5 className="text-xl tracking-tight text-slate-900">{product.general_product_name}, {product.brand.brand_name}</h5>
                </a>
                <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                        <span className="text-3xl font-bold text-slate-900">${selectedVariant?.value || (product.products[0]?.value ?? 0)}</span>
                    </p>
                    <div className="flex items-center">
                        <p>Sizes:</p>
                        <select value={selectedVariant?.size.size_name || ''} onChange={e => handleSizeChange(e.target.value)}>
                            
                            {product.products.map((variant, index) => (
                                <option key={index} value={variant.size.size_name}>
                                    {variant.size.size_name}
                                </option>
                            ))}
                        </select>
                        <p>Colors:</p>
                        <select value={selectedColor} onChange={e => handleColorChange(e.target.value)}>
                            
                            {product.products.map((variant, index) => (
                                <option key={index} value={variant.color.color_name}>
                                    {variant.color.color_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <a href="#" className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to cart</a>
            </div>
        </div>

    );
};

export default ProductCard;
