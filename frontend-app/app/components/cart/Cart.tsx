'use client'
import React, { useState, useEffect } from 'react';
import { CartDisplayDto } from '@/app/lib/cart/cartInterface';
import CartItem from './CartItem';
import OrderForm from '../order/orderForm';


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
    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };

    return (
        <>
            <div className="flex flex-row ">
                {cartItems.map(item => (
                    <CartItem
                        key={item.product_id}
                        product_id={item.product_id}
                        product_price={item.product_price}
                        quantity={item.quantity}
                        size_available={item.size_available}
                        image_url={item.image_url}
                        onRemoveItem={handleRemoveItem}
                    />
                ))}
                <div className="total-price">
                    Total: ${totalPrice.toFixed(2)}
                </div>
            </div>
            <div>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={toggleFormVisibility}>
                    {showForm ? 'CheckOut' : '   Close Checkout   '}
                </button>
            </div>
            {showForm &&
                <div className="">
                    <OrderForm />
                </div>
            }
        </>
    );
}



