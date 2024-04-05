"use client"
import React, { useEffect, useState } from 'react';
import { ProductInterface } from '../../lib/products/ProductInterface';

const ProductDetailPage: React.FC = () => {
    const [product, setProduct] = useState<ProductInterface | null>(null);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Error fetching product details</div>;
    }

    console.log("General product name is: ", product.general_product_name);

    return (
        <div className="m-10">
            <h1>{product.general_product_name}</h1>
            <p>{product.description}</p>
            {product.products?.map((variant, index) => (
                <div key={index}>
                    <h2>{variant.color.color_name}</h2>
                    <img src={variant.hover_image_url || variant.image_url} alt={`Image of ${variant.color.color_name}`} />
                    <p>Price: ${variant.value}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductDetailPage;
