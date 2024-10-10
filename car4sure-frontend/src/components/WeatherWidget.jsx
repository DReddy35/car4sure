import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherWidget = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/weather')
            .then(response => {
                setWeather(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the weather data:', error);
            });
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Weather in {weather.name}</h1>
            <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
            <p>Weather: {weather.weather[0].description}</p>
        </div>
    );
};

export default WeatherWidget;
