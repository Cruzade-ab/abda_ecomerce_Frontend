import { FormFieldProps } from "@/app/lib/Account/validation/FieldType"

const FormField: React.FC<FormFieldProps> = ({
    type,
    placeholder,
    label,
    name,
    register,
    error,
}) => (
    <>
        {label && <label htmlFor={name} className='text-xs font-semibold px-1'>{label}</label>}
        <input className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
            type={type}
            placeholder={placeholder}
            {...register(name)}    
        />
        {error && <span className="error-message ">{error.message}</span>}
    </>
)

export default FormField