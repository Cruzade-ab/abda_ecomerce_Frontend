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
  color_name: string;
  imageFile: File | null;  
  hoverImageFile: File | null; 
  sizes: { [key: string]: string }; 
};



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
| "general_product_name"
  | "brand_name"
  | "description"
  | "section"
  |string