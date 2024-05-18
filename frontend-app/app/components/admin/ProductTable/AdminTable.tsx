import React, { useState, useEffect } from 'react';
import { ProductInterface, ProductVariant } from '../../../lib/products/ProductInterface';

type ProductTableProps = {
    products: ProductInterface[];
    onEdit: (productId: number, colorId: number) => void;
    onRemove: (id: number) => void;
};

const AdminTable: React.FC<ProductTableProps> = ({ products, onEdit, onRemove }) => {
    const [selectedColors, setSelectedColors] = useState<Record<number, string>>({});

    // Effect to set initial selected color for each product
    useEffect(() => {
        const initialColors = products.reduce((acc, product) => {
            const firstColor = product.products[0]?.color.color_name || '';
            acc[product.general_product_id] = firstColor;
            return acc;
        }, {} as Record<number, string>);

        setSelectedColors(initialColors);
    }, [products]);

    const getImageUrls = (variants: ProductVariant[], color: string) => {
        const variant = variants.find(v => v.color.color_name === color);
        return {
            main: variant?.image_url || 'default-image-url',
            hover: variant?.hover_image_url || 'default-hover-image-url'
        };
    };

    return (
        <div>
            <table className='w-full border'>
                <thead>
                    <tr>
                        <th className='border'>Product</th>
                        <th className='border'>Image</th>
                        <th className='border'>Section</th>
                        <th className='border'>Info</th>
                        <th className='border'>Brand</th>
                        <th className='border'>Color</th>
                        <th className='border'>Sizes</th>
                        <th className='border'>Edit</th>
                        <th className='border'>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => {
                        const selectedColor = selectedColors[product.general_product_id];
                        const { main, hover } = getImageUrls(product.products, selectedColor);
                        const filteredVariants = product.products.filter(v => v.color.color_name === selectedColor);

                        return (
                            <tr className='border' key={product.general_product_id}>
                                <td className='border'>{product.general_product_name}</td>
                                <td className='border'>
                                    <img src={main} alt={product.general_product_name} style={{ width: '50px', height: '50px' }} />
                                    <img src={hover} alt={product.general_product_name} style={{ width: '50px', height: '50px' }} />
                                </td>
                                <td className='border'>{product.section.section_name}</td>
                                <td className='border'>{product.description}</td>
                                <td className='border'>{product.brand.brand_name}</td>
                                <td className='border'>
                                    <select
                                        onChange={(e) => setSelectedColors(prev => ({
                                            ...prev,
                                            [product.general_product_id]: e.target.value
                                        }))}
                                        value={selectedColor || ''}
                                    >
                                        {product.products.map(p => p.color.color_name)
                                            .filter((value, index, self) => self.indexOf(value) === index)
                                            .map(color => (
                                                <option key={color} value={color}>{color}</option>
                                            ))}
                                    </select>
                                </td>
                                <td className='border'>
                                    {filteredVariants.map(variant => (
                                        <div key={`${variant.size.size_id}-${variant.color.color_id}`}>
                                            {variant.size.size_name} ({variant.size_amount.size_amount})
                                        </div>
                                    ))}
                                </td>
                                <td className='border'>
                                    <button onClick={() => {
                                        const selectedVariant = product.products.find(v => v.color.color_name === selectedColor);
                                        if (selectedVariant) {
                                            onEdit(product.general_product_id, selectedVariant.color.color_id);
                                        }
                                    }} >Edit</button>
                                </td>
                                <td className='border'>
                                    <button onClick={() => onRemove(product.general_product_id)}>Remove</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default AdminTable;

