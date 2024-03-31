import React from 'react'
import Image from "next/image";
import sun from "../assets/sun-light.svg";

interface properties {
    // High: number,
    // Low: number
}

const ForecastComponent = (props : properties) => {
  return (
    <div className='bg-white bg-opacity-40 p-5 text-center rounded-lg text-thin flex justify-center flex-col items-center'>

      <p className='text-lg'>TUE 12/8</p>
      <Image src={sun} alt="Weather icon" className='w-12 h-12 mt-2 mb-2'></Image>
      <p className='text-lg'>74 F | 34 F</p>

    </div>
  )
}

export default ForecastComponent