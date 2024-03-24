import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import FormField from './AdminFormField'; // Assuming this is the path to your FormField component
import { FormData, Product } from './adminType';
import { zodResolver } from '@hookform/resolvers/zod';
import AdminFormSchema from './AdminFormSchema';

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        getValues,
        setValue,
      } = useForm<FormData>({
        resolver: zodResolver(AdminFormSchema), 
      });

    const [products, setProducts] = useState([{ value: '', color: '', description: '', section: '', imageFile: null, size: '', size_amount: '' }]);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
      try {
          const formData = {
              general_product_name: data.general_product_name,
              brand_name: data.brand_name,
              products: data.products.map((product) => ({
                  value: product.value,
                  color: product.color,
                  description: product.description,
                  section: product.section,
                  size: product.size,
                  size_amount: product.size_amount,
                  imageFile: product.imageFile || null,
              })),
          };
  
          const response = await fetch('http://localhost:4000/api/product/create', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
          });
  
          if (response.ok) {
              console.log('Form submitted successfully');
          } else {
              console.error('Error submitting form');
          }
      } catch (error) {
          console.error('Error:', error);
      }
  };
  
    

    const addProduct = () => {
        const productsCopy = [...products];
        productsCopy.push({ value: '', color: '', description: '', section: '', imageFile: null, size: '', size_amount: '' });
        setProducts(productsCopy);
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Input fields for general product name and brand name */}
      <FormField
        type="text"
        placeholder="Enter general product name"
        label="General Product Name"
        name="general_product_name"
        register={register}
        error={errors.general_product_name}
        inputStyle="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
        labelStyle="label-style"
        inputIcon="input-icon"
      />
      <FormField
        type="text"
        placeholder="Enter brand name"
        label="Brand Name"
        name="brand_name"
        register={register}
        error={errors.brand_name}
        inputStyle="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
        labelStyle="label-style"
        inputIcon="input-icon"
      />

      {/* Input fields for products (dynamic) */}
      {products.map((product: Product, index: number) => (
        <div key={index}>
          <h3>Product {index + 1}</h3>
          <FormField
            type="text"
            placeholder={`Enter product ${index + 1} value`}
            label={`Product ${index + 1} Value`}
            name={`products.${index}.value`}
            register={register}
            error={errors.products?.[index]?.value}
            inputStyle="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
            labelStyle="label-style"
            inputIcon="input-icon"
          />
          <FormField
            type="text"
            placeholder={`Enter product ${index + 1} color`}
            label={`Product ${index + 1} Color`}
            name={`products.${index}.color`}
            register={register}
            error={errors.products?.[index]?.color}
            inputStyle="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
            labelStyle="label-style"
            inputIcon="input-icon"
          />
          <FormField
            type="text"
            placeholder={`Enter product ${index + 1} description`}
            label={`Product ${index + 1} Description`}
            name={`products.${index}.description`}
            register={register}
            error={errors.products?.[index]?.description}
            inputStyle="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
            labelStyle="label-style"
            inputIcon="input-icon"
          />
          <FormField
            type="text"
            placeholder={`Enter product ${index + 1} section`}
            label={`Product ${index + 1} Section`}
            name={`products.${index}.section`}
            register={register}
            error={errors.products?.[index]?.section}
            inputStyle="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
            labelStyle="label-style"
            inputIcon="input-icon"
          />
          <FormField
            type="file" // Assuming you want to upload a file for imageFile
            placeholder={`Upload product ${index + 1} image`}
            label={`Product ${index + 1} Image`}
            name={`products.${index}.imageFile`}
            register={register}
            error={errors.products?.[index]?.imageFile}
            inputStyle="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
            labelStyle="label-style"
            inputIcon="input-icon"
          />
          <FormField
            type="text"
            placeholder={`Enter product ${index + 1} size`}
            label={`Product ${index + 1} Size`}
            name={`products.${index}.size`}
            register={register}
            error={errors.products?.[index]?.size}
            inputStyle="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
            labelStyle="label-style"
            inputIcon="input-icon"
          />
          <FormField
            type="text"
            placeholder={`Enter product ${index + 1} size amount`}
            label={`Product ${index + 1} Size Amount`}
            name={`products.${index}.size_amount`}
            register={register}
            error={errors.products?.[index]?.size_amount}
            inputStyle="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
            labelStyle="label-style"
            inputIcon="input-icon"
            />
          
        </div>
      ))}

      <button type="button" onClick={addProduct}>Add Product</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RegisterForm;
