import React from 'react';
import {ProductInterface, ProductVariant} from '../../../lib/products/ProductInterface'; 

type ProductTableProps = {
  products: ProductInterface[];
  onEdit: (id: number) => void;
  onRemove: (id: number) => void;
};

const AdminTable: React.FC<ProductTableProps> = ({ products, onEdit, onRemove }) => {
    const getUniqueVariants = (variants: ProductVariant[]) => {
    const unique = new Map<string, ProductVariant>();
    variants.forEach(variant => {
      const key = `${variant.color.color_name}-${variant.image_url}-${variant.size.size_name}`;
      if (!unique.has(key)) {
        unique.set(key, variant);
      }
    });
    return Array.from(unique.values());
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
            <th className='border'>Price</th>
            <th className='border'>Size</th>
            <th className='border'>Edit</th>
            <th className='border'>Remove</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const uniqueVariants = getUniqueVariants(product.products);
            return uniqueVariants.map((variant, index) => (
              <tr className='border' key={variant.product_id}>
                {index === 0 && (
                  <td className='border' rowSpan={uniqueVariants.length}>{product.general_product_name}</td>
                )}
                <td>
                  <img src={variant.image_url} alt={product.general_product_name} style={{ width: '50px', height: '50px' }} />
                </td>
                {index === 0 && (
                  <td className='border' rowSpan={uniqueVariants.length}>{product.section.section_name}</td>
                )}
                {index === 0 && (
                  <td className='border' rowSpan={uniqueVariants.length}>{product.description}</td>
                )}
                {index === 0 && (
                  <td className='border' rowSpan={uniqueVariants.length}>{product.brand.brand_name}</td>
                )}
                <td className='border'>{variant.color.color_name}</td>
                <td className='border'>${variant.value.toFixed(2)}</td>
                <td className='border'>{variant.size.size_name} ({variant.size_amount.size_amount})</td>
                <td className='border'><button onClick={() => onEdit(variant.product_id)}>Edit</button></td>
                <td className='border'><button onClick={() => onRemove(variant.product_id)}>Remove</button></td>
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;