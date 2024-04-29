'use client'
import React, { useState, useEffect } from 'react';
import { CartDisplayDto } from '@/app/lib/cart/cartInterface';
import CartItem from './CartItem';
import OrderForm from '../order/orderForm';
import Link from 'next/link';
import CheckoutContainer from '../checkout_container/Checkout';


export default function Cart() {
    const [cartItems, setCartItems] = useState<CartDisplayDto[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [showForm, setShowForm] = useState(false); 


    useEffect(() => {
        // Carga los elementos del carrito desde tu API
        fetch('http://localhost:4000/api/cart/getCartInfo', {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setCartItems(data);
                const total = data.reduce((acc: number, item: { product_price: number; quantity: number; }) => acc + (item.product_price * item.quantity), 0);
                setTotalPrice(total);
                console.log(cartItems)
            })
            .catch(error => console.error('Error al obtener los elementos del carrito:', error));
    }, []);

    const handleRemoveItem = (productId: number) => {
        // Implementa la lógica para eliminar un producto del carrito
        fetch('http://localhost:4000/api/cart/deleteCartItem', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId }), // Envía el ID del producto en el cuerpo de la solicitud
        })
            .then(response => {
                if (response.ok) {
                    // Actualiza el estado para reflejar el elemento eliminado
                    setCartItems(currentItems => currentItems.filter(item => item.product_id !== productId));
                    // Recalcula el precio total
                    setTotalPrice(currentTotal => currentTotal - (cartItems.find(item => item.product_id === productId)?.product_price ?? 0) * (cartItems.find(item => item.product_id === productId)?.quantity ?? 0));
                } else {
                    // Maneja los errores, como mostrar un mensaje al usuario
                    console.error('Error al eliminar el producto del carrito:', response.status);
                }
            })
            .catch(error => console.error('Error al eliminar el producto del carrito:', error));
    };


    return (
      <div className="flex flex-col md:flex-row md:items-start justify-between">
        <div className="flex-1">
          <h2 className='text-center text-2xl md:text-4xl font-bold mb-8'>Your Cart</h2>
          <div className="flex flex-wrap">
            {cartItems.map(item => (
              <CartItem
                key={item.product_id}
                {...item}
                onRemoveItem={handleRemoveItem}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center md:w-1/4 mt-20">
          <div className="bg-gray-100 rounded-lg shadow-md p-6">
            <div className="mb-4 text-xl font-bold">
              Total: <span className="text-green-600">${totalPrice.toFixed(2)}</span>
            </div>
            <CheckoutContainer />
          </div>
        </div>
      </div>
    );
     
}



