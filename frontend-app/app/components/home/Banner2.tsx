
import Productcard from '@/app/components/Products/Productcard'

export default function Banner(){


    return (
        
        
        <div className="flex flex-col  justify-center items-center">
        
            <div className="w-full h-[500px] pt-2 border-2 border-black flex flex-row justify-center items-center space-between space-x-6">
           
                    <div className='hover:transform hover:scale-110'>
                            <Productcard/>
                    </div> 
                        
                    <div className='hover:transform hover:scale-110'> 
                            <Productcard/>
                    </div>
                        
                    <div className='hover:transform hover:scale-110'>
                            <Productcard/>
                    </div>  

                    <div className='hover:transform hover:scale-110'>
                            <Productcard/>
                    </div>  
                        

            </div>
        </div>
       
    )
}