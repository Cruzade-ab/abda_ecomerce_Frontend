import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import FormField from './AdminFormField'; 
import { MyFormData, Product } from './adminType';
import { zodResolver } from '@hookform/resolvers/zod';
import AdminFormSchema from './AdminFormSchema';


const AdminForm = () => {
  const { register, handleSubmit, formState: { errors }, control } = useForm<MyFormData>({
    resolver: zodResolver(AdminFormSchema),
  });

  const [products, setProducts] = useState<Product[]>([{
    value: '', 
    color_name: '' ,
    imageFile: null, 
    hoverImageFile: null ,
    sizes: { S: '', M: '', L: '', XL: '' }
  }]);

  const onSubmit: SubmitHandler<MyFormData> = async (data) => {
    const formData = new FormData();

    formData.append("general_product_name", data.general_product_name);
    formData.append("brand_name", data.brand_name);
    formData.append("description", data.description);
    formData.append("section", data.section);

    data.products.forEach((product, index) => {
      formData.append(`products[${index}][value]`, product.value);
      formData.append(`products[${index}][color_name]`, product.color_name);
      if (product.imageFile) {
        formData.append(`products[${index}][imageFile]`, product.imageFile);
      }
      if (product.hoverImageFile) {
        formData.append(`products[${index}][hoverImageFile]`, product.hoverImageFile);
      }

      // Append size amounts for each size
      Object.keys(product.sizes).forEach((size) => {
        formData.append(`products[${index}][sizes][${size}]`, product.sizes[size]);
      });
    });

    console.log(formData)

    try {
      const response = await fetch('http://localhost:4000/api/admin/product/create', {
        method: 'POST',
        body: formData,
        
      });
      console.log(formData)

      if (response.ok) {
        console.log('Form submitted successfully');
        console.log(formData)
      } else {
        console.error('Error submitting form');
        console.log(formData)
      }
    } catch (error) {
      console.error('Error:', error);
      console.log(formData)
    }
  };


  const addProduct = () => {
    setProducts([...products, { 
      value: '', 
      color_name: '',
      imageFile: null, 
      hoverImageFile: null ,
      sizes: { S: '', M: '', L: '', XL: '' }
    }]);
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField
        type="text"
        placeholder="Enter general product name"
        label="General Product Name"
        name="general_product_name"
        register={register}
        error={errors.general_product_name} labelStyle={''} inputStyle={''} inputIcon={''}      />
      <FormField
        type="text"
        placeholder="Enter brand name"
        label="Brand Name"
        name="brand_name"
        register={register}
        error={errors.brand_name} labelStyle={''} inputStyle={''} inputIcon={''}      />
      <FormField
        type="text"
        placeholder="Enter description"
        label="Description"
        name="description"
        register={register}
        error={errors.description} labelStyle={''} inputStyle={''} inputIcon={''}      />
      <FormField
        type="text"
        placeholder="Enter section"
        label="Section"
        name="section"
        register={register}
        error={errors.section} labelStyle={''} inputStyle={''} inputIcon={''}      />

      {products.map((product, index) => (
        <div key={index}>
          <h3>Product {index + 1}</h3>
          <FormField
            type="text"
            placeholder={`Enter product ${index + 1} value`}
            label={`Product ${index + 1} Value`}
            name={`products.${index}.value`}
            register={register} error={undefined} labelStyle={''} inputStyle={''} inputIcon={''}          />
          <FormField
            type="text"
            placeholder={`Enter product ${index + 1} color`}
            label={`Product ${index + 1} Color`}
            name={`products.${index}.color`}
            register={register} error={undefined} labelStyle={''} inputStyle={''} inputIcon={''}          />
          <Controller
            name={`products[${index}].imageFile`  as keyof MyFormData}
            control={control}
            render={({ field }) => (
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files) field.onChange(e.target.files[0]);
                }}
              />
            )}
          />
          <Controller
            name={`products[${index}].hoverImageFile`  as keyof MyFormData}
            control={control}
            render={({ field }) => (
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files) field.onChange(e.target.files[0]);
                }}
              />
            )}
          />
          {['S', 'M', 'L', 'XL'].map((size) => (
            <FormField
              key={size}
              type="text"
              placeholder={`Enter amount for size ${size}`}
              label={`Size ${size} Amount`}
              name={`products[${index}].sizes.${size}`}
              register={register}
              error={errors.products?.[index]?.sizes?.[size]} labelStyle={''} inputStyle={''} inputIcon={''}/>
          ))}
        </div>
      ))}

      <button type="button" onClick={addProduct}>Add Product</button>

      <button type="submit" onClick={handleSubmit(onSubmit)}>Submit</button>
    </form>
  );
};

export default AdminForm;
