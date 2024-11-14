import React from "react";
import Weather from "../02-weather-api/Weather";

export default function WeatherApiPage () {
    let lat = -37.418136
    let long = 145.428134

    return (
        <div className={'h-screen min-h-[500px] w-screen min-w-[400px] flex items-center'}>
            <Weather latitude={lat} longitude={long} />
        </div>
    );
}