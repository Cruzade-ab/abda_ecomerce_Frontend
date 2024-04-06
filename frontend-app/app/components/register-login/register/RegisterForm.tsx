// Archivo para el componente RegisterForm  Para entender vea este orden(1- FieldType, 2- FormField , 3- UserSchema, 4-RegisterForm)
import { SubmitHandler, useForm } from "react-hook-form";
//Libreria para manejar la logica y funcionalidad del formulario
import  Link  from "next/link"
import { FormData } from "@/app/lib/register-login/register/FieldType";
import UserSchema from "@/app/lib/register-login/register/UserSchema";
import FormField from "./FormField"
import { zodResolver } from "@hookform/resolvers/zod";
import '@mdi/font/css/materialdesignicons.min.css';
import { useRouter } from "next/navigation";


function RegisterForm () {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
      } = useForm<FormData>({
        resolver: zodResolver(UserSchema), 
      });
      // Vea Explain.md file

    //Funcion para manejar la logica cuando se envia el formulario
    const onSubmit: SubmitHandler<FormData> = async (data, event) => {

        event?.preventDefault();
        const {confirmPassword , ...FormData} = data;
        //Se descontruye la data ya que no queremos enviar el confirmPassword

        try{
            const response = await fetch('http://localhost:4000/api/user/register',{ 
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(FormData),
            })
            if (response.ok) {
              console.log('Formulario enviado correctamente')
              router.push('/login')
            } else {
              console.error('Error al enviar el formulario')
            }
          }catch (error){
            console.error('')
          }
          //Fetch envia esta data a un url del backend, mediante una solicitud HTTP, asignando su method, header y body. Se convierte la data a un objeto JSON
    } 

    return ( //Explain.md para los estilos del form 
      <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5"> {/** Se establece un body que ocupe toda la pantalla, de color gray-900 Div como contenedor Flex para centralizar el sub contenedor */}
        <div className="bg-gray-100 text-gray-600 rounded-3xl shadow-xl w-full overflow-hidden" style={{maxWidth: "1000px"}}>
          <div className="md:flex w-full">
            <div className="hidden md:block w-1/2">
              <img
                src="/registerBackground.jpg"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                alt="Register Background Image"
              />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-1/2 py-10 px-5 md:px-10">
                <div className="text-center mb-10">
                  <h1 className="font-bold text-3xl text-gray-900">
                    Register
                  </h1>
                  <p>Please enter your information to register</p>
                </div>
                <div className="">
                  <div className="flex -mx-3 ">
                    <div className="w-1/2 px-3 mb-5 ">
                      <FormField 
                      label="First Name"
                      type="name"
                      placeholder="Name"
                      name="name"
                      register={register}
                      error={errors.name}
                      labelStyle="text-xs font-semibold px-1"
                      inputStyle="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
                      inputIcon="mdi mdi-account-outline text-gray-400 text-lg"
                      />
                    </div>
                    <div className="w-1/2 px-3 mb-5">
                        <FormField
                        label="Last Name"
                        type="last_name"
                        placeholder="Last name"
                        name="last_name"
                        register={register}
                        error={errors.last_name}
                        labelStyle="text-xs font-semibold px-1"
                        inputStyle="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
                        inputIcon="mdi mdi-account-outline text-gray-400 text-lg"
                    />
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                        <FormField
                      label="Email"
                      type="email"
                      placeholder="Email"
                      name="email"
                      register={register}
                      error={errors.email}
                      labelStyle="text-xs font-semibold px-1"
                      inputStyle="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
                      inputIcon="mdi mdi-email-outline text-gray-400 text-lg"
                    />
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                    <FormField
                      label="Password"
                      type="password"
                      placeholder="Password"
                      name="password"
                      register={register}
                      error={errors.password}
                      labelStyle="text-xs font-semibold px-1"
                      inputStyle="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
                      inputIcon="mdi mdi-lock-outline text-gray-400 text-lg"
                    />
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <FormField
                      label="Confirm Password"
                      type="password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      register={register}
                      error={errors.confirmPassword}
                      labelStyle="text-xs font-semibold px-1"
                      inputStyle="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-500"
                      inputIcon="mdi mdi-lock-outline text-gray-400 text-lg"
                    />
                    </div>
                  </div>

                  <div className="flex -mx-3 my-6 justify-center">
                    <p>Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Log In</Link></p>
                  </div>

                  <div className="flex -mx-3">
                    <button type="submit" className="block w-full max-w-xs mx-auto bg-gray-500 hover:bg-zinc-800 focus:bg-gray-900 text-white rounded-lg px-3 py-3 font-semibold">
                    Submit
                  </button>
                  </div>

                </div>  
            </form>
          </div>
        </div>
      </div>
    );
}

export default RegisterForm;