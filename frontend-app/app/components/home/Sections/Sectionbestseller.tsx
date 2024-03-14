import React from "react";
import Card from "../Card/Card";


export default function Section () {
    return (
        <section>
         <h1 className=" flex flex-1 justify-center text-center align-top text-2xl md:text-4xl  font-bold "> Best Sellers Shirts</h1>
            <div className='grid grid-cols-4 justify-around '>
                
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
           
              </div>
           
        </section>
    )

}