"use client"
import React, { useEffect, useState } from 'react';
import { ProductInterface } from '../../lib/products/ProductInterface';
import MainLayout from '@/app/components/home/main-layout/MainLayout';
const ProductDetailPage: React.FC = () => {
    const [product, setProduct] = useState<ProductInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
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

    const handleColorChange = (colorName: string) => {
        // Buscar el producto con el color seleccionado
        const selectedProductVariant = product?.products.find(productVariant => productVariant.color.color_name === colorName);
        if (selectedProductVariant) {
            setSelectedColor(colorName);
            setProduct(prevProduct => {
                if (!prevProduct) return null;
                return {
                    ...prevProduct,
                    products: prevProduct.products.map(productVariant => {
                        if (productVariant.color.color_name === colorName) {
                            return {
                                ...productVariant,
                                image_url: selectedProductVariant.image_url,
                                hover_image_url: selectedProductVariant.hover_image_url
                            };
                        }
                        return productVariant;
                    })
                };
            });
        }
    };
    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Error fetching product details</div>;
    }

    console.log("General product name is: ", product.general_product_name);
    const variant = product.products[0];
    const section = product.section
    return (
       <>
        <MainLayout children={undefined} isAdmin={false} onCategoryChange={function (_category: string): void {
                throw new Error('Function not implemented.');
            } }/>
        <div className=" container mx-auto">
        <div className='flex gap-4'>
            <div className='grid gap-4 grid-cols-2'>
                <img className='rounded-lg border border-transparent shadow-xl' src={variant.image_url} alt={`Image of ${variant.color.color_name}`} />
                <img className="rounded-lg border border-transparent shadow-xl" src={variant.hover_image_url} alt={`Image of ${variant.color.color_name}`} />
            </div>
            <div className='flex-1 p-4 rounded-lg  border border-gray-200'>
              <div className='text-sm'>
                <p>{section.section_name}</p> 
               
              </div> 
              <div className='text-2xl'>
                <h1>{product.general_product_name}</h1>
              </div>
              <div className='py-3 text-base'>
               <p>{product.description}</p>
              </div> 
              <div className='text-3xl'>
                <p>${variant.value}</p>
              </div>
              <div>
                            {/* Botones para cambiar el color */}
                            <div>
                                {product.products.map(productVariant => (
                                    <button
                                        key={productVariant.color.color_name}
                                        onClick={() => handleColorChange(productVariant.color.color_name)}
                                        style={{ backgroundColor: productVariant.color.color_name, width: '20px', height: '20px', borderRadius: '50%', marginRight: '5px', border: 'none' }}
                                    />
                                ))}
                            </div>
                        </div>
            
            </div>
        </div> 
    </div>
    </>
    );
};

export default ProductDetailPage;
