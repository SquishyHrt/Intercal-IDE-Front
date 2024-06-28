import {fetchWeatherApi} from 'openmeteo';
import {useEffect, useState} from "react";
import '../index.css';
import TopRainy from '../assets/TopRainy.png';
import TopSunny from '../assets/TopSunny.png';

const url = "https://api.open-meteo.com/v1/forecast";

const IsRaining = (precipitationData: any): boolean => {
    if (precipitationData.precipitation > 0) {
        return true;
    }
    if (precipitationData.rain > 0) {
        return true;
    }
    if (precipitationData.showers > 0) {
        return true;
    }
    return precipitationData.snowfall > 0;
}

const GetMeteoData = async ({lat, long}: { lat: any, long: any }) => {
    try {
        const params = {
            "latitude": parseFloat(lat),
            "longitude": parseFloat(long),
            "current": ["precipitation", "rain", "showers", "snowfall"],
            "timezone": "Europe/Berlin",
            "forecast_days": 1
        };
        const responses = await fetchWeatherApi(url, params);
        const current = responses[0].current()!;
        return {
            precipitation: current.variables(0)!.value(),
            rain: current.variables(1)!.value(),
            showers: current.variables(2)!.value(),
            snowfall: current.variables(3)!.value(),
        };
    } catch (error) {
        console.error('Error during fetch of meteo:', error);
    }
};

const GetMeteo = ({lat, long, children}: { lat: string, long: string, children: any }) => {
    const [meteoCode, setMeteoCode] = useState<boolean>(false);

    useEffect(() => {
        console.log("Fetching meteo data at ", lat, long);
        const fetchMeteoData = async () => {
            const precipitationData = await GetMeteoData({lat: lat, long: long});
            setMeteoCode(IsRaining(precipitationData));
        };
        fetchMeteoData().then();
    }, [lat, long]);

    const background = meteoCode ? TopRainy : TopSunny;

    return (
        <div className="top-box" style={{background: `url(${background}) no-repeat`}}>
            {children}
        </div>
    )
}

export default GetMeteo