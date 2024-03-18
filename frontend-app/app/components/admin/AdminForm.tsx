"use client"
import React, { useState } from 'react';



const AdminForm: React.FC = () => {
    const [generalProduct, setGeneralProduct] = useState<GeneralProductDTO>({
      general_product_id: 0,
      general_product_name: '',
      brand: { brand_id: 0, brand_name: '' },
      products: []
    });
  
    const handleGeneralProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setGeneralProduct({
        ...generalProduct,
        [e.target.name]: e.target.value
      });
    };
  
    const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setGeneralProduct({
        ...generalProduct,
        brand: { ...generalProduct.brand, [e.target.name]: e.target.value }
      });
    };
  
    const addProductVariant = () => {
      const newProduct: ProductDTO = {
        product_id: generalProduct.products.length + 1, // Simple increment, consider unique IDs for real applications
        value: 0,
        color: { color_id: 0, color_name: '' },
        description: '',
        section: { section_id: 0, section_name: '' },
        image_url: '',
        size_amount: { size_amount_id: 0, size_amount: 0 , size: '' },
        imageFile: undefined
      };
      setGeneralProduct({
        ...generalProduct,
        products: [...generalProduct.products, newProduct]
      });
    };
  
    const handleProductChange = (index: number, field: string, value: any) => {
      const updatedProducts = generalProduct.products.map((product, i) => {
        if (i === index) {
          return { ...product, [field]: value };
        }
        return product;
      });
      setGeneralProduct({ ...generalProduct, products: updatedProducts });
    };

    const handleFileChange = (index: number, file: File) => {
        const updatedProducts = generalProduct.products.map((product, i) => {
          if (i === index) {
            return { ...product, imageFile: file };
          }
          return product;
        });
        setGeneralProduct({ ...generalProduct, products: updatedProducts });
      };
      
    









      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      
        const formData = new FormData();
      
        // Add general product data to formData
        formData.append('general_product_id', String(generalProduct.general_product_id));
        formData.append('general_product_name', generalProduct.general_product_name);
        formData.append('brand_id', String(generalProduct.brand.brand_id));
        formData.append('brand_name', generalProduct.brand.brand_name);
      
        // Append each product variant and its details to formData
        generalProduct.products.forEach((product, index) => {
          formData.append(`products[${index}][product_id]`, String(product.product_id));
          formData.append(`products[${index}][value]`, String(product.value));
          formData.append(`products[${index}][description]`, product.description);
          formData.append(`products[${index}][color_id]`, String(product.color.color_id));
          formData.append(`products[${index}][color_name]`, product.color.color_name);
          // Add other product details similarly
      
          if (product.imageFile) {
            formData.append(`products[${index}][imageFile]`, product.imageFile);
          }
        });
      
        try {
          const response = await fetch('https://localhost:4000/products/create', {
            method: 'POST',
            body: formData
          });
      
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
      
          const result = await response.json();
          console.log('Success:', result);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
















    return (
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <input 
          className='w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500'
          type="text"
          name="general_product_name"
          value={generalProduct.general_product_name}
          onChange={handleGeneralProductChange}
          placeholder="General Product Name"
        />
        <input  
          className='w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500'
          type="text"
          name="brand_name"
          value={generalProduct.brand.brand_name}
          onChange={handleBrandChange}
          placeholder="Brand Name"
        />
        
        {generalProduct.products.map((product, index) => (
          <div key={index}>
            <input
             className='w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500'
              type="text"
              placeholder="Product Description"
              value={product.description}
              onChange={(e) => handleProductChange(index, 'description', e.target.value)}
            />

            <input
              className='w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500'
              type="text"
              placeholder="Size"
              value={product.size_amount.size}
              onChange={(e) => handleProductChange(index, 'size', e.target.value)}
            />

            <input
              className='w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500'
              type="number"
              placeholder="Product Size"
              value={product.size_amount.size_amount}
              onChange={(e) => handleProductChange(index, 'Size Amount', e.target.value)}
            />

            <input
              className='w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500'
              type="number"
              placeholder="Product Value"
              value={product.value}
              onChange={(e) => handleProductChange(index, 'Price', e.target.value)}
            />

            <input
              className='w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500'
              type="text"
              placeholder="Color"
              value={product.color.color_name}
              onChange={(e) => handleProductChange(index, 'color', e.target.value)}
            />

            <input
                type="file"
                onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                    handleFileChange(index, e.target.files[0]);
                    }
                }}
            />
            
          </div>
        ))}
  
        <button type="button" onClick={addProductVariant} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
          Add Product Variant
        </button>
        <button type="submit" className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full'>Submit</button>
      </form>
    );
  };
  
  export default AdminForm;