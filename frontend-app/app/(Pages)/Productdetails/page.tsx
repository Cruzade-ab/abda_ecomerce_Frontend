import React from 'react'
import { ProductInterface, ProductVariant } from '@/app/components/Producto/ProductInterface'


export const Productdetails = () => {
  return (
    <div className='container flex flex-col-2 mx-auto px-4'>
        <div className='flex flex-col-1'>
            <h1 className='align-center items-center'>Fotos</h1>
        </div>
        <div className='flex flex-col-1'>
           
            <div className='flex flex-row'>
                <div>
                    <h1>Titulo</h1>
                    <p>aqui seria la descripcion del producto</p>

                </div>
                <div>
                    
                </div>
                
            </div>
        </div>
        
    </div>
  )
}



 