import React, { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import FormField from './AdminFormField';
import { MyFormData, FormProduct } from '../../../lib/admin/createProduct/adminType';
import { zodResolver } from '@hookform/resolvers/zod';
import AdminFormSchema from '../../../lib/admin/createProduct/AdminFormSchema';
import { ProductInterface } from '@/app/lib/products/ProductInterface';
import { convertProductToFormData } from '@/app/lib/admin/EditProduct/DataConversion';





interface EditAdminFormProps {
  product?: ProductInterface;
  onSubmitSuccess: () => void;
  handleCloseEditModal: () => void;
}


const EditAdminForm: React.FC<EditAdminFormProps>= ({onSubmitSuccess, handleCloseEditModal, product}) => {
  const { register, handleSubmit, reset, formState: { errors }, control } = useForm<MyFormData>({
    resolver: zodResolver(AdminFormSchema),
  });

  useEffect(() => {
    if (product) {
      console.log('Converting Product: ', product);
      const formData = convertProductToFormData(product);
      console.log('Data converted', formData);
      reset(formData); 
      setProducts(formData.products);  
    }
  }, [product, reset]);
  

  const [products, setProducts] = useState<FormProduct[]>([{
    value: '',
    color_name: '',
    imageFile: null,
    hoverImageFile: null,
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
        onSubmitSuccess();
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
      hoverImageFile: null,
      sizes: { S: '', M: '', L: '', XL: '' }
    }]);
  };


  return (
    <>
      <div className='flex items-center justify-center'>
        
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full max-w-4xl p-5 bg-white shadow-md rounded-lg items-center'>

        <h1 className='text-center font-bold text-xl'>
          Editing The Product
        </h1>
    
        <FormField
          type="text"
          placeholder="Enter product name"
          label="Product Name"
          name="general_product_name"
          register={register}
          error={errors.general_product_name}
          inputStyle='w-auto -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500'
          labelStyle=''
          inputIcon=''
        />
        <FormField
          type="text"
          placeholder="Enter brand name"
          label="Brand Name"
          name="brand_name"
          register={register}
          error={errors.brand_name}
          inputStyle='w-auto -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500'
          labelStyle=''
          inputIcon=''
        />
        <FormField
          type="text"
          placeholder="Enter description"
          label="Description"
          name="description"
          register={register}
          error={errors.description}
          inputStyle='w-auto -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500'
          labelStyle=''
          inputIcon=''
        />
        <FormField
          type="text"
          placeholder="Enter section"
          label="Section"
          name="section"
          register={register}
          error={errors.section}
          inputStyle='w-auto -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500'
          labelStyle=''
          inputIcon=''
        />

{products.map((product, index) => (
  <div key={index} className='flex flex-col gap-4 my-4 items-center'>
    <h3 className='text-center font-bold'>{`Details for ${product.color_name} Variant`}</h3>
    <FormField
      type="text"
      placeholder={`Value for ${product.color_name}`}
      label="Value"
      name={`products[${index}].value`}
      register={register}
      error={errors.section}
      inputStyle='w-auto -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500'
      labelStyle=''
      inputIcon=''
      defaultValue={product.value}
    />
    {Object.entries(product.sizes).map(([sizeKey, sizeValue]) => (
      <FormField
        key={`${index}-${sizeKey}`}
        type="text"
        label={`Size ${sizeKey}`}
        name={`products[${index}].sizes.${sizeKey}`}
        register={register}
        defaultValue={sizeValue}
        error={undefined}
        inputStyle='w-auto -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500'
        labelStyle=''
        inputIcon=''
      />
    ))}
    <div className='flex flex-col gap-4'>
      <img src={product.imageUrl || 'default-image-url'} alt="Product" style={{ width: '100px', height: '100px' }} />
      <Controller
        name={`products[${index}].imageFile` as keyof MyFormData}
        control={control}
        render={({ field }) => (
          <input type="file" onChange={(e) => e.target.files && field.onChange(e.target.files[0])} className="form-input rounded" />
        )}
      />
      <img src={product.hoverImageUrl || 'default-hover-image-url'} alt="Hover Image" style={{ width: '100px', height: '100px' }} />
      <Controller
        name={`products[${index}].hoverImageFile` as keyof MyFormData}
        control={control}
        render={({ field }) => (
          <input type="file" onChange={(e) => e.target.files && field.onChange(e.target.files[0])} className="form-input rounded" />
        )}
      />
    </div>
  </div>
))}
        <div className='flex gap-3 my-3'>
          <button type="button" onClick={addProduct} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add Product</button>
          <button type="submit" className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Submit</button>
          <button onClick={handleCloseEditModal} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Cancel</button>
        </div>
      </form>
    </div>
    </>);
};

export default EditAdminForm;