"use client";

import "../components/style.css"
import CityComponent from "@/components/CityComponent";
import { useEffect, useState } from "react";
import {getWeather, getForecast, initialWeather, getWeatherFromCity, getForecastFromCity} from "../Data Services/script";
import React from 'react'
import Link from "next/link";
import { Navbar, FloatingLabel, Button } from "flowbite-react";
import { HiOutlineSearch } from "react-icons/hi";
import ForecastComponent from "@/components/ForecastComponent";
import DailyComponent from "@/components/DailyComponent";

export default function Home() {

  const [weather, setWeather] = useState<CurrentWeather>(Object);
  const [forecast, setForecast] = useState<CurrentForecast>(Object);
  const [threeDay, setThreeDay] = useState<ForecastObject[]>([]);
  const [weeklyIndex, setWeeklyIndex] = useState<number[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);

  // For the tab from daily forecast
  const [visible, setVisible] = useState<string>("hidden");

  // Search Function

  const handleSearch = async () => {
    const data = await getWeatherFromCity(search);
    setWeather(data);
    const data2 = await getForecastFromCity(search);
    setForecast(data2);
    getDailyForecast(data2);
  }

  // Ran on first application run

  const getInitialData = async () => {
    initialWeather();
    if(loaded){
      const data = await getWeather();
      const data2 = await getForecast();
      setWeather(data);
      setForecast(data2);

      getDailyForecast(data2);
    }
  }

  // Gets the indexes of the start of each day in the forecast list.
  // And also gets the first three items.

  const getDailyForecast = (data:CurrentForecast) => {

    const first = data?.list?.slice(0, 3);
    setThreeDay(first);

    let list = [0];
    
    for(let i = 1; i < data?.list?.length; i++){
      if(data.list[i].dt_txt?.split(' ')[0].split('-')[2] !== data.list[i-1].dt_txt?.split(' ')[0].split('-')[2]){
        list.push(i);
      }
    }
    setWeeklyIndex(list);
  }

  const openDailyForecast = (day:number) => {
    if(visible == "hidden"){
      setVisible("");
    }
    else{
      setVisible("hidden");
    }
  }

  //Printer
  const printShit = () => {
    console.log(weeklyIndex);
    console.log(threeDay);
    console.log(forecast);
    console.log(weather);
  }

  useEffect(() => {
    getInitialData();
    setLoaded(true);

  }, [loaded]);

  return (
    <div>
        <Navbar fluid >
          <Navbar.Brand as={Link} href="/">
            <span className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white text-gray-500">climate.xchange</span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <FloatingLabel variant="outlined" label="Search for a City" onChange={(e) => {setSearch(e.target.value)}}/>
            <Button className='' onClick={handleSearch}> <HiOutlineSearch className='h-6 w-6'/> </Button>
          </Navbar.Collapse>
        </Navbar>
      <div className="justify-center flex">
          <div className='lg:w-3/4'>
            <CityComponent City={weather.name} MainTemp={Math.floor(weather?.main?.temp)} High={Math.floor(weather?.main?.temp_max)} Low={Math.floor(weather?.main?.temp_min)} WeatherType={weather.weather != undefined ? weather?.weather[0].description : ""}TimeTemps={threeDay}WeatherOne={threeDay[0]?.weather?.description} WeatherTwo={threeDay[0]?.weather?.description} WeatherThree={threeDay[0]?.weather?.description}></CityComponent>
            <div className='grid lg:grid-cols-5 gap-8 mt-6'>
              <a onClick={() => {openDailyForecast(0)}}><ForecastComponent></ForecastComponent></a>
              <a onClick={() => {openDailyForecast(1)}}><ForecastComponent></ForecastComponent></a>
              <a onClick={() => {openDailyForecast(2)}}><ForecastComponent></ForecastComponent></a>
              <a onClick={() => {openDailyForecast(3)}}><ForecastComponent></ForecastComponent></a>
              <a onClick={() => {openDailyForecast(4)}}><ForecastComponent></ForecastComponent></a>
            </div>
          </div>
      </div>

      <div className="items-center flex flex-col mt-6">
        <div>
        <Button size="lg" onClick={printShit} className="w-96" color="gray">Open your Favorite Places</Button>
        </div>

        <div className={visible}>
          <DailyComponent></DailyComponent>
        </div>
      </div>
    </div>
  );
}
