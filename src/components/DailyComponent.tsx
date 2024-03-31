import React from 'react'
import Image from "next/image";

const DailyComponent:any = () => {
  return (
    <div className="bg-white bg-opacity-60 p-5 rounded-lg flex">
      
    <div>
      <h1 className='text-4xl font-light'>Tuesday</h1>
      <hr className='border-dotted border-1 border-gray-300'></hr>
      <p>Partly cloudy</p>
    </div>

    <div className='flex flex-row justify-around text-center text-gray-500'>
        <div>
          <p className="text-lg mb-4">8am</p>
          <Image src={""} alt="Weather Icon" className="h-20 w-20 mb-4"></Image>
          <h1 className="text-5xl text-gray-700">5°</h1>
        </div>
          <hr className='border-dotted border-1 border-gray-300'></hr>
        <div>
          <p className="text-lg mb-4">8am</p>
          <Image src={""} alt="Weather Icon" className="h-20 w-20 mb-4"></Image>
          <h1 className="text-5xl text-gray-700">5°</h1>
        </div>
          <hr className='border-dotted border-1 border-gray-300'></hr>
        <div>
          <p className="text-lg mb-4">8am</p>
          <Image src={""} alt="Weather Icon" className="h-20 w-20 mb-4"></Image>
          <h1 className="text-5xl text-gray-700">5°</h1>
        </div>
      </div>

    </div>
  )
}

export default DailyComponent