import React from 'react';
import {ProductInterface} from '../../../lib/products/ProductInterface'; 

type ProductTableProps = {
  products: ProductInterface[];
  onEdit: (id: number) => void;
  onRemove: (id: number) => void;
};

const AdminTable: React.FC<ProductTableProps> = ({ products, onEdit, onRemove }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Image</th>
            <th>Section</th>
            <th>Info</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Price</th>
            <th>Size</th>
            <th>Edit</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <React.Fragment key={product.general_product_id}>
              {product.products.map((variant, index) => (
                <tr key={variant.product_id}>
                  {index === 0 && (
                    <td rowSpan={product.products.length}>{product.general_product_name}</td>
                  )}
                  <td>
                    <img src={variant.image_url} alt={product.general_product_name} style={{ width: '50px', height: '50px' }} />
                  </td>
                  {index === 0 && (
                    <td rowSpan={product.products.length}>{product.section.section_name}</td>
                  )}
                  {index === 0 && (
                    <td rowSpan={product.products.length}>{product.description}</td>
                  )}
                  {index === 0 && (
                    <td rowSpan={product.products.length}>{product.brand.brand_name}</td>
                  )}
                  <td>{variant.color.color_name}</td>
                  <td>${variant.value.toFixed(2)}</td>
                  <td>{variant.size.size_name} ({variant.size_amount.size_amount})</td>
                  <td><button onClick={() => onEdit(variant.product_id)}>Edit</button></td>
                  <td><button onClick={() => onRemove(variant.product_id)}>Remove</button></td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
