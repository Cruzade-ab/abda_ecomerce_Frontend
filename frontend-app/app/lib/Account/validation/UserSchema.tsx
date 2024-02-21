import { z, ZodType } from "zod";
import { FormData } from "./FieldType";

export const UserSchema: ZodType<FormData> = z.object({
    name: z.string(),

    last_name: z.string(),

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

  export default UserSchema