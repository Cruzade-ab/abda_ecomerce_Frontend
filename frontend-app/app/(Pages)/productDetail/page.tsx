'use client'
import React, { useEffect, useState } from 'react';
import { ProductInterface } from '../../lib/products/ProductInterface';

const ProductDetailPage = () => {
    const [product, setProduct] = useState<ProductInterface | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productVariantId = localStorage.getItem('selectedProductVariantId');
                if (!productVariantId) {
                    throw new Error('Product variant ID not found in localStorage');
                }

                const response = await fetch('/api/products/getProductById', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ productVariantId }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch product variant');
                }

                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product variant:', error);
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
        return <div>Error fetching product variant</div>;
    }

    return (
        <div>
            <h1>{product.general_product_name}</h1>
            <p>{product.description}</p>
            {/* Render other product details */}
        </div>
    );
};

export default ProductDetailPage;