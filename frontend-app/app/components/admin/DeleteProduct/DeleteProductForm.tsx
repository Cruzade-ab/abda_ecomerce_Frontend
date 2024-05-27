import React, { useEffect, useState } from 'react';
import { ProductInterface, ProductVariant } from '@/app/lib/products/ProductInterface';

interface EditAdminFormProps {
  product?: ProductInterface;
  colorId?: number | null;
  onSubmitSuccess: () => void;
  handleCloseDeleteModal: () => void;
}

interface ProductIds {
  S: number;
  M: number;
  L: number;
  XL: number;
}
const defaultProductIds: ProductIds = { S: 0, M: 0, L: 0, XL: 0 };

const DeleteAdminForm: React.FC<EditAdminFormProps> = ({ onSubmitSuccess, handleCloseDeleteModal, product, colorId }) => {

  const [variant, setVariant] = useState<ProductVariant | null>(null);

  useEffect(() => {
    if (product && colorId !== null && colorId !== undefined) {
      const selectedVariant = product.products.find(p => p.color.color_id === colorId);
      setVariant(selectedVariant || null);

      console.log('General Product id:', product.general_product_id)

    }
  }, [product, colorId]);


  return (
    <>
    <h1 className='text-center font-bold text-xl m-3 text-red-900'>
        You are Deleting the T-Shirt: "{product?.general_product_name}" of color: {variant?.color.color_name}
    </h1>

    <p>
        This action will only delete the product
    </p>


    <button onClick={handleCloseDeleteModal} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Delete Color</button>

    <button onClick={handleCloseDeleteModal} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Close</button>
    </>
  );
};

export default DeleteAdminForm;