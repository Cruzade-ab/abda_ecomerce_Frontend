import { FieldError, UseFormRegister } from "react-hook-form";


export type FormData = {
    name?: string;
    last_name?: string;
    email: string;
    password: string;
    confirmPassword?: string;
  };

export type FormFieldProps = {
    type: string;
    placeholder: string;
    label: string;
    name: ValidFieldNames;
    register: UseFormRegister<FormData>;
    error: FieldError | undefined;
    labelStyle: string;
    inputStyle: string;
    inputIcon: string;
};

export type ValidFieldNames =
  | "name"
  | "last_name"
  | "email"
  | "password"
  | "confirmPassword";
