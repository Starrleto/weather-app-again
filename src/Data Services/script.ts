const success = (pos : Coordinate) => {
    position = pos;
}

const error = () => {
    position = {coords : {latitude : 37.9577, longitude : -121.2908}}
}

const initialWeather = async () => {
    navigator.geolocation.getCurrentPosition(success, error);
}

let position : Coordinate = {coords : {latitude : 37.9577, longitude : -121.2908}};
const getWeather = async () => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&units=imperial&lon=${position.coords.longitude}&appid=7fbd1b6369fa6e2aeaa7bddc2568003f`);
    const data : CurrentWeather = await promise.json();
    return data;
}

const getForecast = async () => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=7fbd1b6369fa6e2aeaa7bddc2568003f`);
    const data = await promise.json();
    return data;
}

const getWeatherFromCity = async (city:string) => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=7fbd1b6369fa6e2aeaa7bddc2568003f`);
    const data : CurrentWeather = await promise.json();
    return data;
}

const getForecastFromCity = async (city:string) => {
    const promise =await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=7fbd1b6369fa6e2aeaa7bddc2568003f`);
    const data : CurrentForecast = await promise.json();
    return data;
}

const addFav = (item :string) => {
    let data = localStorage.getItem("FavList");

    if(data != undefined)
    {
        let favList:string[] = JSON.parse(data);

        if(!favList.includes(item)){
            favList.push(item);
            localStorage.setItem("FavList", JSON.stringify(favList));
        }
        else{
            let newFavList = favList.filter((i) => i != item);
            localStorage.setItem("FavList", JSON.stringify(newFavList));
        }

    }
    else
    {
        let favList : string[] = [item];
        localStorage.setItem("FavList", JSON.stringify(favList));
    }
}

const getFavs = () => {
    const array = localStorage.getItem("FavList");
    if(array != undefined)
        return array;
    else
        return [];
}

const checkIfInFavs = (item :string) => {
    let data = localStorage.getItem("FavList");

    if(data != undefined)
    {
        let favList:string[] = JSON.parse(data);
        return favList.includes(item);
    }
    
    return false;
}


export {getWeather, getForecast, initialWeather, getWeatherFromCity, getForecastFromCity, addFav, getFavs, checkIfInFavs}