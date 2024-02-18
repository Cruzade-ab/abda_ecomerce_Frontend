import React, { InputHTMLAttributes } from 'react'
//Importamos React para acceder a su libreria ya que estaremos creando un componente de React
// InputHTMLAttributes es un type de react que nos permite acceder a los atributos de la etiqueta input


interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string; 
}
//Interface nos permite acceder y definir la estructura de un objeto en este caso extendemos el type de 
// InputHTMLAttributes que es un elemento input <>, y le agregamos el attributo label que en el type no lo posee

const InputField: React.FC<InputFieldProps> = ({label, ...rest}) => {
//Definimos el componente InputField, que es un elemento input que posee los atributos definidos en InputFieldProps 
    return (
        <div className=''>
            {<label htmlFor={rest.id || rest.name} className=''>{label}</label>} 
            {/* Definimos la etiqueta label y la asignamos al attributo input que se haya pasado en las props, ya sea id o el name */}
            <input {...rest} className='' />
        </div>
    )
}

export default InputField