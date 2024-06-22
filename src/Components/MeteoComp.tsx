import {fetchWeatherApi} from 'openmeteo';
import {useEffect, useState} from "react";

const params = {
    "latitude": 48.132022,
    "longitude": -1.621433,
    "current": ["precipitation", "rain", "showers", "snowfall"],
    "timezone": "Europe/Berlin",
    "forecast_days": 1
};
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

const GetMeteo = () => {
    const GetMeteoData = async () => {
        try {
            const responses = await fetchWeatherApi(url, params);
            const current = responses[0].current()!;
            return {
                precipitation: current.variables(0)!.value(),
                rain: current.variables(1)!.value(),
                showers: current.variables(2)!.value(),
                snowfall: current.variables(3)!.value(),
            };
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };

    const [meteoCode, setMeteoCode] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const fetchMeteoData = async () => {
            const precipitationData = await GetMeteoData();
            setMeteoCode(IsRaining(precipitationData));
        };
        fetchMeteoData().then();
    }, []);

    if (meteoCode === undefined) {
        return <div>Loading...</div>;
    }

    return <div>Raining ?: {meteoCode ? 'Yes' : 'No'}</div>;
}

export default GetMeteo