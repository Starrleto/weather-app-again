"use client";
import { Button } from "flowbite-react";
import sun from "../assets/sun-light.svg";
import clouds from "../assets/cloud-light.svg"
import rain from "../assets/cloud-rain-light.svg"
import sunClouds from "../assets/cloud-sun-light.svg"
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import outlineHeart from "../assets/heart-light.svg";
import fillHeart from "../assets/heart-fill.svg";
import { checkIfInFavs as isInFavs, addFav, getFavs } from "@/Data Services/script";

interface properties {
  City: string
  MainTemp: number
  WeatherType: string
  High: number
  Low: number
  TimeTemps: ForecastObject[]
  WeatherOne: string
  WeatherTwo: string
  WeatherThree: string
}

const CityComponent = (props : properties) => {

  const [favImage, setFavImage] = useState(outlineHeart);

  const click = () => {
    addFav(props.City);
    console.log(getFavs())

    if (typeof window !== "undefined") {
      if(isInFavs(props.City)){
        setFavImage(fillHeart);
      }
      else{
        setFavImage(outlineHeart);
      }
    }
  }

  const getIcon = (name:string) => {
    switch(name){
      case "overcast clouds": return clouds;
      case "broken clouds": return sunClouds;
      case "light rain": return rain;
      default: return clouds;
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      if(isInFavs(props.City)){
        setFavImage(fillHeart);
      }
      else{
        setFavImage(outlineHeart);
      }
    }

  }, [props])

  return (
    <div className='grid lg:grid-cols-2 gap-4'>

        <div className='bg-gray-100 mt-16 p-8 rounded-xl'>
        
        <div className='flex justify-between'>
          <h1 className='text-3xl font-extralight mb-4'>{props.City}</h1>
          <a onClick={click}><Image src={favImage} alt="Favorite Icon"></Image></a>
        </div>

        <div className='flex justify-center'>
          <Image src={getIcon(props.WeatherType)} alt="Weather Icon" className="h-32 w-32"/>
          <h1 className='text-9xl text-gray-700'>{props.MainTemp} F</h1>
        </div>
        
        <hr className='border-dotted border-1 border-gray-300 mt-6 mb-6 border-2 rounded-lg'></hr>
        <div className='flex justify-between text-2xl'>
          <p>{props.WeatherType}</p>
          <p>H: {props.High} F / L : {props.Low} F</p>
        </div>
    </div>

      <div className='bg-gray-100 mt-16 p-8 container rounded-xl'>
      
      <div className='flex justify-between mb-6 text-3xl font-extralight'>
        <h1>Today</h1>
        <h1>12:55 PM</h1>
      </div>

      <div className='flex flex-row justify-around text-center text-gray-500'>
        <div>
          <p className="text-lg mb-4">8am</p>
          <Image src={getIcon(props.WeatherOne)} alt="Weather Icon" className="h-20 w-20 mb-4"></Image>
          <h1 className="text-5xl text-gray-700">{Math.floor(props.TimeTemps[0]?.main?.temp)}°</h1>
        </div>
          <hr className='border-dotted border-1 border-gray-300'></hr>
        <div>
          <p className="text-lg mb-4">8am</p>
          <Image src={getIcon(props.WeatherTwo)} alt="Weather Icon" className="h-20 w-20 mb-4"></Image>
          <h1 className="text-5xl text-gray-700">{Math.floor(props.TimeTemps[1]?.main?.temp)}°</h1>
        </div>
          <hr className='border-dotted border-1 border-gray-300'></hr>
        <div>
          <p className="text-lg mb-4">8am</p>
          <Image src={getIcon(props.WeatherThree)} alt="Weather Icon" className="h-20 w-20 mb-4"></Image>
          <h1 className="text-5xl text-gray-700">{Math.floor(props.TimeTemps[2]?.main?.temp)}°</h1>
        </div>
      </div>

      </div>

    </div>
  )
}

export default CityComponent