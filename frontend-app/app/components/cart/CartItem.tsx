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

// CartItem component with dual images and refined layout
export default function CartItem({ product_id, product_price, quantity, size_available, image_url, onRemoveItem }: CartItemProps) {
    return (
        <div className="w-full md:w-1/2 p-2">
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden h-full border border-gray-300">
                <img src={image_url} alt="Product" className="md:w-1/2 w-full object-cover" />
                <div className="product-details p-4 flex flex-col justify-between w-full">
                    <div>
                        <p className="text-lg font-semibold">Price: ${product_price.toFixed(2)}</p>
                        <p className="text-lg text-gray-600">Quantity: {quantity}</p>
                        <p className="text-lg text-gray-600">Size Available: {size_available}</p>
                    </div>
                    <button onClick={() => onRemoveItem(product_id)} className="mt-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg text-sm px-4 py-2 focus:outline-none focus:ring-red-300">
                        Remove Product
                    </button>
                </div>
            </div>
        </div>
    );
}



