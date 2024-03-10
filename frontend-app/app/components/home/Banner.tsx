import Link from 'next/link'


export default function Banner(){


    return (
        <div className="w-full h-[600px] bg-gray-200 flex flex-row">

            <div className="bg-gray-400 w-1/2 flex flex-col items-center justify-center bg-cover" style={{backgroundImage: "url('./Mens.jpg')"}}>

                <Link href="/men">
                    <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        Men
                    </button>
                </Link>

            </div>
            

            <div className="bg-gray-400 w-1/2 flex flex-col items-center justify-center bg-cover" style={{backgroundImage: "url('./Womens.webp')"}}>
            <Link href ="/women">
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    Women
                </button>
            </Link>
            </div>

        </div>
    )
}