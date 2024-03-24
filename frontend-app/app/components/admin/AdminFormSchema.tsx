import { z, ZodType } from "zod";
import { FormData, Product } from "./adminType";

const AdminFormSchema: ZodType<FormData> = z.object({
    general_product_name: z.string().nonempty(),
    brand_name: z.string().nonempty(),
    products: z.array(
        z.object({
            value: z.string(), // Change type to string
            color: z.string().nonempty(),
            description: z.string().nonempty(),
            section: z.string().nonempty(),
            imageFile: z.any(),
            size: z.string().nonempty(),
            size_amount: z.string(), // Change type to string
        })
    ).min(1) as ZodType<Product[]> // Explicitly cast to ZodType<Product[]>
});

export default AdminFormSchema;
