import { FieldError, UseFormRegister } from "react-hook-form";

export type FormData = {
    general_product_name: string;
    brand_name: string;
    products: Product[];
  };

export type Product = {
    value: string;
    color: string;
    description: string;
    section: string;
    imageFile: File | null;
    size: string;
    size_amount: string;
};



export type FormFieldProps = {
    type: string;
    placeholder: string;
    label: string;
    name: ValidFieldNames;
    register: UseFormRegister<FormData>; //
    error: FieldError | undefined;

    //Se asignan estas propiedades para en el momento de inicializar el componente FormField, poder pasarle respectivamente cada Estilo de manera individual, vea el props en el FormField y al momento de inicializar el mismo en el formulario
    labelStyle: string; 
    inputStyle: string;
    inputIcon: string;
};
//Tipado para los props(Atributos que se utilizaran en el FormField component)

export type ValidFieldNames =
  | "general_product_name"
  | "brand_name"
  | "products"
  | `products.${number}`
  | `products.${number}.value`
  | `products.${number}.color`
  | `products.${number}.description`
  | `products.${number}.section`
  | `products.${number}.imageFile`
  | `products.${number}.size`
  | `products.${number}.size_amount`;