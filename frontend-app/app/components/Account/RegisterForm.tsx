import { useForm } from "react-hook-form";
import { FormData, UserSchema } from "@/app/lib/Account/validation/FieldType";
import FormField from "./FormField"
import { zodResolver } from "@hookform/resolvers/zod";

function RegisterForm () {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
      } = useForm<FormData>({
        resolver: zodResolver(UserSchema), 
      });


    const onSubmit = async (data: FormData) => {
        const {confirmPassword , ...FormData} = data;

        try{
            const response = await fetch('https://backendapp-production-5383.up.railway.app/api/submit-form',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(FormData),
            })
            if (response.ok) {
              console.log('Formulario enviado correctamente')
            } else {
              console.error('Error al enviar el formulario')
            }
          }catch (error){
            console.error('')
          }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className=" ">
            <h1 className="">
              Register
            </h1>

            <FormField 
                type="name"
                placeholder="Name"
                name="name"
                register={register}
                error={errors.name}
            />

            <FormField
                type="last_Name"
                placeholder="Last name"
                name="last_Name"
                register={register}
                error={errors.last_Name}
            />

            <FormField
              type="email"
              placeholder="Email"
              name="email"
              register={register}
              error={errors.email}
            />
  
            <FormField
              type="password"
              placeholder="Password"
              name="password"
              register={register}
              error={errors.password}
            />
  
            <FormField
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              register={register}
              error={errors.confirmPassword}
            />

            <button type="submit" className="submit-button">
              Submit
            </button>

          </div>
        </form>
    );
}

export default RegisterForm;