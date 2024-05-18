import React, { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import FormField from './EditAdminFormField';
import { MyFormData, FormProduct} from '../../../lib/admin/createProduct/editAdminType';
import EditAdminFormSchema from '../../../lib/admin/createProduct/EditAdminFormSchema';
import { ProductInterface, ProductVariant } from '@/app/lib/products/ProductInterface';

interface EditAdminFormProps {
  product?: ProductInterface;
  colorId?: number | null;
  onSubmitSuccess: () => void;
  handleCloseEditModal: () => void;
}

const EditAdminForm: React.FC<EditAdminFormProps> = ({ onSubmitSuccess, handleCloseEditModal, product, colorId }) => {
  const { register, handleSubmit, reset, formState: { errors }, control } = useForm<MyFormData>({
    resolver: zodResolver(EditAdminFormSchema),
  });

  const [variant, setVariant] = useState<ProductVariant | null>(null);

  useEffect(() => {
    if (product && colorId !== null && colorId !== undefined) {
      const selectedVariant = product.products.find(p => p.color.color_id === colorId);
      setVariant(selectedVariant || null);

      if (selectedVariant) {
        const formData: MyFormData = {
          general_product_name: product.general_product_name,
          brand_name: product.brand.brand_name,
          description: product.description,
          section: product.section.section_name,
          products: [
            {
              value: selectedVariant.value.toString(),
              color_name: selectedVariant.color.color_name,
              imageUrl: selectedVariant.image_url,
              hoverImageUrl: selectedVariant.hover_image_url,
              sizes: {
                S: getSizeAmount(product.products, 'S', colorId),
                M: getSizeAmount(product.products, 'M', colorId),
                L: getSizeAmount(product.products, 'L', colorId),
                XL: getSizeAmount(product.products, 'XL', colorId),
              },
              imageFile: null,
              hoverImageFile: null,
            }
          ]
        };
        reset(formData);
      }
    }
  }, [product, colorId, reset]);

  const getSizeAmount = (variants: ProductVariant[], sizeName: string, colorId: number): string => {
    const variant = variants.find(v => v.size.size_name === sizeName && v.color.color_id === colorId);
    return variant ? variant.size_amount.size_amount.toString() : '';
  };

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
      (["S", "M", "L", "XL"] as const).forEach((size) => {
        formData.append(`products[${index}][sizes][${size}]`, product.sizes[size]);
      });
    });

    try {
      const response = await fetch('http://localhost:4000/api/admin/product/create', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        onSubmitSuccess();
      } else {
        console.error('Error submitting form');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='flex items-center justify-center'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full max-w-4xl p-5 bg-white shadow-md rounded-lg items-center'>

        <h1 className='text-center font-bold text-xl'>
          You are editing the product 
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

        {variant && (
          <div className='flex flex-col gap-4 my-4 items-center'>
            <h3 className='text-center font-bold'>{`Details for ${variant.color.color_name}`}</h3>
            <FormField
              type="text"
              placeholder={`Value for ${variant.color.color_name}`}
              label="Value"
              name={`products.0.value`}
              register={register}
              defaultValue={variant.value.toString()}
              inputStyle='w-auto -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500'
              labelStyle=''
              inputIcon=''
              error={undefined}
            />
            {(["S", "M", "L", "XL"] as const).map((size) => (
              <FormField
                key={size}
                type="text"
                label={`Size ${size}`}
                name={`products.0.sizes.${size}`}
                register={register}
                defaultValue={getSizeAmount(product!.products, size, colorId!).toString()}
                inputStyle='w-auto -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500'
                labelStyle=''
                inputIcon=''
                error={undefined}
              />
            ))}
            <div className='flex flex-col gap-4'>
              <img src={variant.image_url || 'default-image-url'} alt="Product" style={{ width: '100px', height: '100px' }} />
              <Controller
                name={`products.0.imageFile`}
                control={control}
                render={({ field }) => (
                  <input type="file" onChange={(e) => e.target.files && field.onChange(e.target.files[0])} className="form-input rounded" />
                )}
              />
              <img src={variant.hover_image_url || 'default-hover-image-url'} alt="Hover Image" style={{ width: '100px', height: '100px' }} />
              <Controller
                name={`products.0.hoverImageFile`}
                control={control}
                render={({ field }) => (
                  <input type="file" onChange={(e) => e.target.files && field.onChange(e.target.files[0])} className="form-input rounded" />
                )}
              />
            </div>
          </div>
        )}
        <div className='flex gap-3 my-3'>
          <button type="submit" className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Submit</button>
          <button onClick={handleCloseEditModal} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Close</button>
        </div>
      </form>
    </div>
  );
};

export default EditAdminForm;