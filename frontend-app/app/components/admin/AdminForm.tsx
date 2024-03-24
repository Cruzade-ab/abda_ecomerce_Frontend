import React, { useState } from 'react';

const AdminForm: React.FC = () => {
  const [generalProduct, setGeneralProduct] = useState<GeneralProductDTO>({
    general_product_name: '',
    brand: { brand: '' },
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
      brand: { ...generalProduct.brand, brand: e.target.value }
    });
  };

  const addProductVariant = () => {
    const newProduct: ProductDTO = {
      value: 0,
      color: { color_name: '' },
      description: '',
      section: { section_name: '' },
      size_amount: { size_amount: 0, size: '' },
      image: null
    };
    setGeneralProduct({
      ...generalProduct,
      products: [...generalProduct.products, newProduct]
    });
  };

  const handleProductChange = (index: number, field: string, value: any) => {
    const updatedProducts = generalProduct.products.map((product, i) => {
      if (i === index) {
        if (field.includes('.')) {
          const parts = field.split('.');
          const nestedField = parts[0];
          return {
            ...product,
            [nestedField]: {
              ...product[nestedField],
              [parts[1]]: value
            }
          };
        } else {
          return { ...product, [field]: value };
        }
      }
      return product;
    });
    setGeneralProduct({ ...generalProduct, products: updatedProducts });
  };

  const handleProductFileChange = (index: number, file: File | null) => {
    const updatedProducts = generalProduct.products.map((product, i) => {
      if (i === index) {
        return { ...product, image: file };
      }
      return product;
    });
    setGeneralProduct({ ...generalProduct, products: updatedProducts });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const productData = {
      general_product_name: generalProduct.general_product_name,
      brand: generalProduct.brand,
      products: generalProduct.products.map(({ image, ...rest }) => rest)
    };

    try {
      console.log("Try fetch data:")
      console.log(FormData)
      const createResponse = await fetch('http://localhost:4000/products/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!createResponse.ok) {
        const errorData = await createResponse.json();
        throw new Error(errorData.message || 'An error occurred while creating the product');
      }

      const productCreationResult = await createResponse.json();
      console.log('Product creation success:', productCreationResult);

      for (let i = 0; i < generalProduct.products.length; i++) {
        const product = generalProduct.products[i];
        if (product.image) {
          const formData = new FormData();
          formData.append('image', product.image);

          const uploadResponse = await fetch(`http://localhost:4000/products/${productCreationResult.id}/upload-image`, {
            method: 'POST',
            body: formData,
          });

          if (!uploadResponse.ok) {
            throw new Error(`Image upload failed for product ${i}`);
          }

          const imageUploadResult = await uploadResponse.json();
          console.log(`Image upload success for product ${i}:`, imageUploadResult);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>
      <input
        type="text"
        name="general_product_name"
        value={generalProduct.general_product_name}
        onChange={handleGeneralProductChange}
        placeholder="General Product Name"
      />
      <input
        type="text"
        name="brand_name"
        value={generalProduct.brand.brand}
        onChange={handleBrandChange}
        placeholder="Brand Name"
      />
      {generalProduct.products.map((product, index) => (
        <div key={index}>
          <input
            type="text"
            value={product.description}
            onChange={(e) => handleProductChange(index, 'description', e.target.value)}
            placeholder="Product Description"
          />
          <input
            type="number"
            value={product.value}
            onChange={(e) => handleProductChange(index, 'value', parseFloat(e.target.value))}
            placeholder="Product Value"
          />
          <input
            type="text"
            value={product.color.color_name}
            onChange={(e) => handleProductChange(index, 'color.color_name', e.target.value)}
            placeholder="Color Name"
          />
          <input
            type="text"
            value={product.section.section_name}
            onChange={(e) => handleProductChange(index, 'section.section_name', e.target.value)}
            placeholder="Section Name"
          />
          <input
            type="number"
            value={product.size_amount.size_amount}
            onChange={(e) => handleProductChange(index, 'size_amount.size_amount', parseFloat(e.target.value))}
            placeholder="Size Amount"
          />
          <input
            type="text"
            value={product.size_amount.size}
            onChange={(e) => handleProductChange(index, 'size_amount.size', e.target.value)}
            placeholder="Size"
          />
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleProductFileChange(index, e.target.files[0]);
              }
            }}
          />
        </div>
      ))}
      <button type="button" onClick={addProductVariant}>
        Add Product Variant
      </button>
      <button type="submit">
        Submit
      </button>
    </form>
  );
};

export default AdminForm;