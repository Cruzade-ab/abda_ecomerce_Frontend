//Este archivo contiene los data Types para los campos del formulario. Para entender vea este orden(1- FieldType, 2- FormField , 3- UserSchema, 4-RegisterForm)

import { FieldError, UseFormRegister } from "react-hook-form";
//Librerias necesarias para el desarrollo de los formularios, verifique el file *Explicaciones.md


export type FormData = {
    name: string;
    last_name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
//Expecificamos el tipado para la data que se utiliza en el formulario

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
  | "name"
  | "last_name"
  | "email"
  | "password"
  | "confirmPassword";
// Se guardan los diferentes tipados para el props.name (FormFieldProps)