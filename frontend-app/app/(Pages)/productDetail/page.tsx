'use client'
import React, { useEffect, useState } from 'react';

const ProductDetailPage = () => {
    const [productVariant, setProductVariant] = useState(null);

    useEffect(() => {
        const productVariantId = localStorage.getItem('selectedProductVariantId');
        if (productVariantId) {
            fetch(`/api/productVariants/${productVariantId}`)
                .then(response => response.json())
                .then(data => setProductVariant(data))
                .catch(err => console.error('Failed to fetch product variant:', err));
        }
    }, []);

    if (!productVariant) {
        return <div>Loading...</div>;
    }

    return (
        <div>
           
        </div>
    );
};

export default ProductDetailPage;