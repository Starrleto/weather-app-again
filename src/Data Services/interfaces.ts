interface Coordinate {
    coords: Coord;
}

interface Coord {
    latitude: number,
    longitude: number
}

interface CurrentWeather {
    name: string
    main: Main
    weather: Weather[]
    timezone: number
}

interface CurrentForecast {
    list: ForecastObject[]
}

interface ForecastObject {
    dt_txt: string
    main: Main
    weather: Weather
}

interface Main {
    temp: number
    temp_max: number
    temp_min: number
}

interface Weather {
    description: string
    main: string
}
