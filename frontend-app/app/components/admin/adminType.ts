import { FieldError, UseFormRegister } from "react-hook-form";

export type MyFormData = {
  general_product_name: string;
  brand_name: string;
  description: string;
  section: string;
  products: Product[];
};

export type Product = {
  value: string;
  color_name: string; // Add color_name property
  imageFile?: any;
  hoverImageFile?: any;
  sizes: {
    S: string;
    M: string;
    L: string;
    XL: string;
    [key: string]: string;
  };
}



export type FormFieldProps = {
  type: string;
  placeholder: string;
  label: string;
  name: ValidFieldNames;
  register: UseFormRegister<MyFormData>;
  error: FieldError | undefined;
  labelStyle: string;
  inputStyle: string;
  inputIcon: string;
};
//Tipado para los props(Atributos que se utilizaran en el FormField component)

export type ValidFieldNames =
  | 'general_product_name'
  | 'brand_name'
  | 'description'
  | 'section'
  | `products.${number}.value`
  | `products.${number}.color_name`
  | `products.${number}.sizes.S`
  | `products.${number}.sizes.M`
  | `products.${number}.sizes.X`
  | `products.${number}.sizes.XL`
