import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { FormData } from "@/app/lib/order/OrderFieldType";
import OrderFormSchema from "@/app/lib/order/OrderFormSchema";
import OrderFormField from "./orderFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import "@mdi/font/css/materialdesignicons.min.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function OrderForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(OrderFormSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data, event) => {
    event?.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/order/orderConfirmation", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Formulario enviado correctamente");
        router.push("/");
      } else {
        console.error("Error al enviar el formulario");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetch('http://localhost:4000/api/cart/getCartInfo', {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        // Optionally, you can update the cart state here
      })
      .catch(error => console.error('Error al obtener los elementos del carrito:', error));
  }, []);

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gray-100 text-gray-600 rounded-3xl shadow-xl px-6 py-10">
        <h1 className="font-bold text-3xl text-gray-900 mb-6">Processing Order</h1>
        <p className="mb-6">Please enter your information to confirm your order</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
          <div className="flex justify-center">
            <p>Do you want to edit your cart? <Link href="/cart" className="text-blue-500 hover:underline">Cart</Link></p>
          </div>
          <button type="submit" className="block w-full bg-gray-500 hover:bg-zinc-800 focus:bg-gray-900 text-white rounded-lg py-3 font-semibold">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default OrderForm;
