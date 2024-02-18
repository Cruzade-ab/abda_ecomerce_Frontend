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
        console.log("SUCCESS", data);
        try{
            const response = await fetch('',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <h1 className="text-3xl font-bold mb-4">
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
                type="lastName"
                placeholder="Last name"
                name="lastName"
                register={register}
                error={errors.lastName}
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