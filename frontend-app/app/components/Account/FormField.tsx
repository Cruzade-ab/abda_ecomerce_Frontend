import { FormFieldProps } from "@/app/lib/Account/validation/FieldType"

const FormField: React.FC<FormFieldProps> = ({
    type,
    placeholder,
    label,
    name,
    register,
    error,
    inputStyle,
    labelStyle,
    inputIcon
}) => (
    <>
        {label && <label htmlFor={name} className={labelStyle}>{label}</label>}
        <div className="flex">
            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className={inputIcon}></i></div>
            <input className={inputStyle}
            type={type}
            placeholder={placeholder}
            {...register(name)}    
        />
        </div>
        {error && <span className="error-message ">{error.message}</span>}
    </>
)

export default FormField