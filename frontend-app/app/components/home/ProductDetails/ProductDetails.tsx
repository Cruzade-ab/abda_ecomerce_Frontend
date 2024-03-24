import React from 'react'
import { ProductInterface, ProductVariant } from '../../Producto/ProductInterface';
import Image from 'next/image';

export const ProductDetails = () => {
  return (
    <div className='flex flex-row w-full pt-8'>
     <section className='flex justify-center flex-start'>
         <ul className='grid grid-rows-1 justify-between px-4 ml-8'>
            <li className='py-4'>
            <Image src="/foto1.jpg" alt = 'foto' width={240} height={533/10}/>
            </li>
            <li className='py-4'>
            <Image src="/foto1.jpg" alt = 'foto' width={240} height={533/10}/>
            </li>
            <li className='py-4'>
            <Image src="/foto1.jpg" alt = 'foto' width={240} height={533/10}/> 
            </li>
            <li className='py-4'>
            <Image src="/foto1.jpg" alt = 'foto' width={240} height={533/10}/>
            </li>
          </ul>
        <div className='grid '>
            <Image className='rounded-xl overflow-clip'src="/foto1.jpg" alt = 'foto' width={800} height={533}/> 
        </div>
        <div className=' ml-2 text-wrap'>
            <p>Aqui irian los detalles de los productos
              resnyrsserhyshyeyhn fdhxzrsh
              ysyxshyyaedj
              djrmtfxjde
              </p>
        </div>
     </section>
     <aside>
       <h2>Seccion de carrito y seleccion de talla,y cantidad</h2>


     </aside>
    </div>
  )
};
