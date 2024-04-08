import React, { useState } from 'react';
import { ProductInterface, ProductVariant } from '../../../lib/products/ProductInterface';

type ProductTableProps = {
  products: ProductInterface[];
  onEdit: (id: number) => void;
  onRemove: (id: number) => void;
};

const AdminTable: React.FC<ProductTableProps> = ({ products, onEdit, onRemove }) => {
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
            const uniqueColors = Array.from(new Set(product.products.map(p => p.color.color_name)));
            const [selectedColor, setSelectedColor] = useState(uniqueColors[0]);
            const filteredVariants = product.products.filter(variant => variant.color.color_name === selectedColor);
            const image_main = filteredVariants[0]?.image_url;
            const image_hover = filteredVariants[0]?.hover_image_url;


            return (
              <tr className='border' key={product.general_product_id}>
                <td className='border'>{product.general_product_name}</td>
                <td className='border'>
                  <img src={image_main} alt={product.general_product_name} style={{ width: '50px', height: '50px' }} />
                  <img src={image_hover} alt={product.general_product_name} style={{ width: '50px', height: '50px' }} />
                </td>
                <td className='border'>{product.section.section_name}</td>
                <td className='border'>{product.description}</td>
                <td className='border'>{product.brand.brand_name}</td>
                <td className='border'>
                  <select onChange={(e) => setSelectedColor(e.target.value)} value={selectedColor}>
                    {uniqueColors.map(color => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </td>
                <td className='border'>
                  {filteredVariants.map(variant => (
                    <div key={variant.size.size_id}>{variant.size.size_name} ({variant.size_amount.size_amount})</div>
                  ))}
                </td>
                <td className='border'>
                  <button onClick={() => onEdit(product.general_product_id)}>Edit</button>
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
