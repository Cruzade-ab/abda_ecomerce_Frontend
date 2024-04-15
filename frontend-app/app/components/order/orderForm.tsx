'use client'
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link"; // Importación de la librería Link de Next.js
import { FormData } from "@/app/lib/order/OrderFieldType"; // Importación del tipo de datos FormData
import OrderFormSchema from "@/app/lib/order/OrderFormSchema"; // Importación del esquema OrderFormSquema
import OrderFormField from "./orderFormField"; // Importación del componente OrderFormField
import { zodResolver } from "@hookform/resolvers/zod"; // Importación del resolver de zod
import "@mdi/font/css/materialdesignicons.min.css"; // Importación del archivo de estilos de los iconos mdi
import { useRouter } from "next/navigation"; // Importación del hook useRouter de Next.js
import { useEffect, useState } from "react";
import { CartDisplayDto } from "@/app/lib/cart/cartInterface";
import Cart from "../cart/Cart";

function OrderForm() {
  const router = useRouter(); // Inicialización del hook useRouter
  const [cartItems, setCartItems] = useState<CartDisplayDto[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(OrderFormSchema), // Uso del resolver zod para el esquema OrderFormSchema
  });

  // Función para manejar la lógica cuando se envía el formulario
  const onSubmit: SubmitHandler<FormData> = async (data, event) => {
    event?.preventDefault(); // Prevenir el comportamiento por defecto del evento
    try {
      const response = await fetch("http://localhost:4000/api/order/orderConfirmation", {
        // Envío de la data mediante una solicitud HTTP
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Formulario enviado correctamente");
        router.push("/"); // Redirección a la página en caso de éxito
      } else {
        console.error("Error al enviar el formulario");
      }
    } catch (error) {
      console.error("Error:", error); // Manejo de errores
    }
  };

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

    return (
        <div className="">
          <div className="bg-gray-100 text-gray-600 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: "1000px" }}>
            <div className="md:flex w-full">
              <div className="hidden md:block w-1/2">
                
                <Cart/>
                
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-1/2 py-10 px-5 md:px-10">
                <div className="text-center mb-10">
                  <h1 className="font-bold text-3xl text-gray-900">
                    Processing Order
                  </h1>
                  <p>Please enter your information to confirm your order</p>
                </div>
                <div className="">
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <OrderFormField
                        label="Address"
                        type="address"
                        placeholder="Enter your address"
                        name="address"
                        register={register}
                        error={errors.address}
                        labelStyle="text-xs font-semibold px-1"
                        inputStyle="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
                        inputIcon="mdi mdi-email-outline text-gray-400 text-lg"
                      />
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <OrderFormField
                        label="City"
                        type="city"
                        placeholder="Select your city"
                        name="city"
                        register={register}
                        error={errors.city}
                        labelStyle="text-xs font-semibold px-1"
                        inputStyle="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
                        inputIcon="mdi mdi-lock-outline text-gray-400 text-lg"
                      />
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <OrderFormField
                        label="State"
                        type="state"
                        placeholder="Select your state"
                        name="state"
                        register={register}
                        error={errors.state}
                        labelStyle="text-xs font-semibold px-1"
                        inputStyle="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
                        inputIcon="mdi mdi-lock-outline text-gray-400 text-lg"
                      />
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <OrderFormField
                        label="Zip Code"
                        type="zip_code"
                        placeholder="Enter Zip Code"
                        name="zip_code"
                        register={register}
                        error={errors.zip_code}
                        labelStyle="text-xs font-semibold px-1"
                        inputStyle="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
                        inputIcon="mdi mdi-lock-outline text-gray-400 text-lg"
                      />
                    </div>
                  </div>
                  <div className="flex -mx-3 my-6 justify-center">
                    <p>Do you want to edit your cart?   <Link href="/cart" className="text-blue-500 hover:underline">Cart</Link></p>
                  </div>
                  <div className="flex -mx-3">
                    <button type="submit" className="block w-full max-w-xs mx-auto bg-gray-500 hover:bg-zinc-800 focus:bg-gray-900 text-white rounded-lg px-3 py-3 font-semibold">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
 
}

export default OrderForm;
