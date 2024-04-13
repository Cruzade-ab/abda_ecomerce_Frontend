"use client"
// CartItem component with TypeScript props
type CartItemProps = {
    product_id: number;
    product_price: number;
    quantity: number;
    size_available: number;
    image_url: string;
    onRemoveItem: (productId: number) => void;
};

export default function CartItem({ product_id, product_price, quantity, size_available, image_url, onRemoveItem }: CartItemProps) {
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