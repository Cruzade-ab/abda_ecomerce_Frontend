import { FormFieldProps } from "@/app/lib/Account/validation/FieldType";

const FormField: React.FC<FormFieldProps> = ({
    type,
    placeholder,
    name,
    register,
    error,
}) => (
    <>
        <input
            type={type}
            placeholder={placeholder}
            {...register(name)}    
        />
        {error && <span className="error-message">{error.message}</span>}
    </>
)

export default FormField