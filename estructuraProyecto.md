## Estructura de Carpetas 

Carpetas Principales 

1- /app 
   * page.tsk (Home Page)
   * layout.tsk (Layout General de toda la Aplicacion)
   * globals.css (Archivo Global de Css)

   * /lib
     * /register-login
        * /FieldForm {validation (Contiene los archivos para las validaciones necesarias para el directorio (login/Registro))}
          *  FieldType.tsx ()
        * /LoginSchema
          * LoginSchema.tsx
        * /LoginType
          * LoginType.tsx
        * /UserSchema  
          *  UserSchema.tsx
        
   
   * /components
     * /register-login
       * FormField.tsx (Componente para el elemento input, con la logica para todos sus atributos)
       * RegisterForm.tsx(Componente de registro)
       * LoginField.tsx
       * LoginForm.tsx
       * LoginFormField.tsx
     * /home
       * /banner
         * banner1.tsx
         * Banner.tsx
       * /navBar
         * Navbar.tsx
       * /Search bar
         * index.ts
         * search.tsx
         * SearchProps.ts
       * /Producto
         *ProductCard.tsx
         *ProductContainer.tsx
         * ProductInterface.tsx  
    
  
   * /Pages (Directorio que contiene las rutas de las paginas)
     * /register 
       * page.tsx (Pagina de Register)
     * /login
       * page.tsx (Pagina de Login)
     * /men
       * page.tsx (Pagina enfocada en Seccion para Hombres)
     * /women 
       * page.tsx (Pagina enfocada en seccion para Mujeres)
     * /cart
       * page.tsx (Pagina de carrito)      
2- /public
    * registerbackground.jpd (Imagen para el Registro)