import React from 'react'

const Footer = () => {
  return (
    <div className='w-full bottom-0 bg-[#f7efdf] '>
        <div className='container mx-auto'>
        <hr className=" " />
            <div className='flex flex-col justify-between '>
                <div className='m-6 text-center'>
                      <p className='text-xl font-semibold'>E-Commerce Website Developed by:</p> 
                      <h1 className='text-base'>ABDA Team Development</h1>
                      <div className='text-sm'>
                            <a href='https://www.linkedin.com/in/abimaelsanta'><p className='text-sm'>Abimael Santa</p></a>
                            <a href='https://www.linkedin.com/in/brianmoralespaganpr'><p className='text-sm'>Brian Morales Pagan</p></a>
                            <a href='https://www.linkedin.com/in/dairandejesusmora?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'><p className='text-sm'>Dairan De Jesus</p></a>
                            <a href='https://docs.google.com/document/d/10PvoP4Mqow4c2GdBx2joqOxg4wPu9xuA/edit?usp=sharing&ouid=100883875536578519710&rtpof=true&sd=true'><p className='text-sm'>Amarillys Hernandez</p></a>
                      </div>
                
                      <div className='m-6 text-center gap-2 '>
                            <h1 className='text-xl py-2 font-semibold'>Team Development Supporters:</h1>
                            <p className='text-sm '>Forte Puerto Rico - Forte Global</p>
                            <p className='text-sm'>Digital School Colombia - Intersoftware Colombia</p>
                            <p className='text-sm'>Departamento de Desarrollo Economico de Puerto Rico</p>
                                <div className='flex flex-row justify-center gap-2'>
                                  <img className='rounded-lg' src='forteglobal_logo.jpeg'></img>
                                  <img className='rounded-lg' src='digitalschoolco_logo.jpeg'></img>
                                  <img className='rounded-lg' src='intersoftwarecolombia_logo.jpeg'></img>
                                  <img className='rounded-lg' src='ddecpr_logo.jpeg'></img>
                                </div>
                            <div className='m-6 text-sm text-center bottom-0 py-2'>
                                <p>@ABDA 2024 All Rights Reserved</p>
                            </div>
                      </div>       
                </div>
               
           </div>
      </div>  
     
           
    </div>
    
  )
}

export default Footer