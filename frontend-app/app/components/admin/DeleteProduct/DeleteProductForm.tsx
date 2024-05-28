import React, { useEffect, useState } from 'react';
import { ProductInterface, ProductVariant } from '@/app/lib/products/ProductInterface';
import Modal from '../Modal/Modal';

interface EditAdminFormProps {
  product?: ProductInterface;
  colorId?: number | null;
  onSubmitSuccess: () => void;
  handleCloseDeleteModal: () => void;
}

const DeleteAdminForm: React.FC<EditAdminFormProps> = ({
  onSubmitSuccess,
  handleCloseDeleteModal,
  product,
  colorId
}) => {

  const [isModalOpen, setModalOpen] = useState(false);
  const [variant, setVariant] = useState<ProductVariant | null>(null);

  useEffect(() => {
    if (product && colorId != null) {
      const selectedVariant = product.products.find(p => p.color.color_id === colorId);
      setVariant(selectedVariant || null);
    }
  }, [product, colorId]);

  const deleteSpecificColor = async () => {
    try {
      const response = await fetch('/api/delete-color', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product?.general_product_id, colorId })
      });
      if (response.ok) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error('Failed to delete specific color:', error);
    }
  };

  const deleteAllColors = async () => {
    try {
      const response = await fetch('/api/delete-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product?.general_product_id })
      });
      if (response.ok) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error('Failed to delete all colors:', error);
    }
  };

  return (
    <>
      <h1 className='text-center font-bold text-xl m-3 text-red-900'>
        You are Deleting the T-Shirt: "{product?.general_product_name}" of color: {variant?.color.color_name}
      </h1>

      <p className='my-4'>
        This action will only delete the specific color: <span className='italic'>{variant?.color.color_name}</span>, for the 
        T-shirt name "{product?.general_product_name}". If you want to 
        delete all colors of this product <span onClick={() => setModalOpen(true)} className='cursor-pointer text-red-600'>click here</span>.
      </p>

      <div className='flex justify-between'>
        <button onClick={deleteSpecificColor} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Delete Specific Color</button>
        <button onClick={handleCloseDeleteModal} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Close</button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div>
          <h1 className='text-center font-bold text-xl m-3 text-red-900'>
          You are about to Delete the T-Shirt: "{product?.general_product_name}"
          </h1>
          <p className='my-3'>Are you sure you want to delete all this product?</p>
          <div className='flex justify-between'>
            <button onClick={deleteAllColors} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Delete All Colors</button>
            <button onClick={() => setModalOpen(false)} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>Close</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteAdminForm;
