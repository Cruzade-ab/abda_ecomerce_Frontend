'use client'
import React, { useState, useEffect } from 'react';
import Navbar from "@/app/components/home/navBar/Navbar";
import { CartDisplayDto } from '@/app/lib/cart/cartInterface';

export default function Cart() {
    const [cartItems, setCartItems] = useState<CartDisplayDto[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        // Load cart items from your API
        fetch('http://localhost:4000/api/cart/getCartInfo', {
            method: 'GET',
            credentials: "include", // To send cookies with the request
            headers: {
                'Content-Type': 'application/json',
                // Ensure the server allows sending cookies and authentication tokens
            },
        })
        .then(response => response.json())
        .then(data => {
            setCartItems(data); // Assuming the response is an array of items
            // Calculate the total price based on the items received
            const total = data.reduce((acc, item) => acc + (item.product_price * item.quantity), 0);
            setTotalPrice(total);
        })
        .catch(error => console.error('Error fetching cart items:', error));
    }, []);

    const handleRemoveItem = (productId: number) => {
        // Implement logic to remove a product from the cart
        fetch(`http://localhost:4000/api/cart/removeFromCart/${productId}`, {
            method: 'DELETE',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                // Ensure the server allows sending cookies and authentication tokens
            },
        })
        .then(response => {
            if (response.ok) {
                // Update the state to reflect the removed item
                setCartItems(currentItems => currentItems.filter(item => item.product_id !== productId));
                // Recalculate the total price
                setTotalPrice(currentTotal => currentTotal - (cartItems.find(item => item.product_id === productId)?.product_price ?? 0) * (cartItems.find(item => item.product_id === productId)?.quantity ?? 0));
            }
        })
        .catch(error => console.error('Error removing item:', error));
    };

    return (
        <>
            <Navbar />
            <div className="cart-container">
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
        </>
    );
}

// CartItem component with TypeScript props
type CartItemProps = {
    product_id: number;
    product_price: number;
    quantity: number;
    size_available: number;
    image_url: string;
    onRemoveItem: (productId: number) => void;
};

function CartItem({ product_id, product_price, quantity, size_available, image_url, onRemoveItem }: CartItemProps) {
    return (
        <div className="cart-item">
            <img src={image_url} alt="Product" />
            <div className="product-details">
                <p>Precio: ${product_price.toFixed(2)}</p>
                <p>Cantidad en carrito: {quantity}</p>
                <p>Tallas disponibles: {size_available}</p>
            </div>
            <button onClick={() => onRemoveItem(product_id)}>Eliminar</button>
        </div>
    );
}
