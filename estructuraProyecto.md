## Estructura de Carpetas 

Carpetas Principales 

1- /app 
   * page.tsk (Home Page)
   * layout.tsk (Layout General de toda la Aplicacion)
   * globals.css (Archivo Global de Css)

   * /lib
     * /Account
        * /validation (Contiene los archivos para las validaciones necesarias para el directorio Account(login/Registro))
          *  FieldType.tsx ()
   * /components
     * /Account
       * FormField.tsx (Componente para el elemento input, con la logica para todos sus atributos)
       * RegisterForm.tsx(Componente de registro)
   * /Account (Directorio que contiene las rutas de las paginas register/login )
     * /register 
       * page.tsx (Pagina de Register)
     * /login
       * page.tsx (Pagina de Login)
       
2- /public
    * registerbackground.jpd (Imagen para el Registro)