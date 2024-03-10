
import { FieldError, UseFormRegister } from "react-hook-form";



export type FormData = {
    email: string;
    password: string;
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
  | "email"
  | "password"
// Se guardan los diferentes tipados para el props.name (FormFieldProps)