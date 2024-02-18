import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

export type FormData = {
    name?: string;
    lastName?: string;
    email: string;
    password: string;
    confirmPassword?: string;
  };

export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<FormData>;
    error: FieldError | undefined;
};

export type ValidFieldNames =
  | "name"
  | "lastName"
  | "email"
  | "password"
  | "confirmPassword";


  export const UserSchema: ZodType<FormData> = z.object({
    name: z.string(),

    lastName: z.string(),

    email: z.string().email(),

    password: z.string()
    .min(5, 'Password must be at least 5 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),

    confirmPassword: z.string(),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
