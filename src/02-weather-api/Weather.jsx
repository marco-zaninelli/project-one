import React, {useEffect, useState} from "react";
import "./loader.css";
import i18n from "i18n-iso-countries";

// Importing images
import Sun from "./assets/sun.svg";
import Clouds from "./assets/clouds.svg";
import Rain from "./assets/rain.svg";
import Thunderstorm from "./assets/thunderstorm.svg";
import Snow from "./assets/snow.svg";
import Mist from "./assets/mist.svg";
import LocationPin from "./assets/pin.svg";

// Registering locale for country names
i18n.registerLocale(require("i18n-iso-countries/langs/en.json"));

// Current date function
function getDate () {
    const today = new Date();
    const month = today.toLocaleString("en-US", {month: "long"});
    const year = today.getFullYear();
    const date = today.getDate();
    return `${date} ${month} ${year}`;
}

// Weather background images
const weatherBackgrounds = {
    "": null,
    "01d": Sun,
    "02d": Sun,
    "03d": Clouds,
    "04d": Clouds,
    "09d": Rain,
    "10d": Rain,
    "11d": Thunderstorm,
    "13d": Snow,
    "50d": Mist
};

export default function Weather ({latitude, longitude}) {
    const [lat, setLat] = useState(-37.418136); // Default latitude
    const [lng, setLng] = useState(145.428134); // Default longitude
    const [data, setData] = useState([]); // Store weather data
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [backgroundStyle, setBackgroundStyle] = useState(""); // Weather background image
    const [yesPosition, setYesPosition] = useState(false); // Track if location is accessed
    const [buttonHover, setButtonHover] = useState(false); // Button hover state

    // Fetch weather data from current weather API
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${lng}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
                );
                const result = await response.json();
                setData(result);
                setIsLoading(false);

                // Set background image based on weather icon
                const backgroundImage = weatherBackgrounds[result.weather[0].icon];
                setBackgroundStyle(backgroundImage || "");

                console.log("Weather data:", result);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };
        fetchWeather();
    }, [lat, lng]);

    // Get user's current location
    function GetLocation () {
        const getLocation = async () => {
            setIsLoading(true);
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    setLat(position.coords.latitude);
                    setLng(position.coords.longitude);
                    setIsLoading(false);
                    setYesPosition(true);
                },
                function (err) {
                    setIsLoading(false);
                }
            );
        };
        getLocation();
    }

    return (
        <div className={"relative w-[400px] h-[500px] mx-auto border border-black rounded-lg"}>

            {/* Loading screen */}
            {isLoading ? (
                <div className={"w-full h-full flex items-center justify-center"}>
                    <div className={"loader"}></div>
                </div>
            ) : (
                <div>
                    {/* Weather background image */}
                    <img src={backgroundStyle} alt={"test"} className={"absolute w-[398px] h-[498px] -z-10 rounded-lg"} />

                    {/* Weather display statistics */}
                    <div className={"p-5 font-roboto-mono"}>
                        <div className={"flex flex-col items-start"}>
                            <p className={"m-0 p-0 text-md"}>{getDate()}</p>
                            <h2 className={"m-0 p-0 text-4xl"}>{data.name}</h2>
                            <p className={"m-0 p-0 text-md"}>{i18n.getName(data.sys.country, "en")}</p>
                        </div>
                        <div className={"absolute w-full top-5 -left-5 transform rotate-90 origin-top-left translate-x-[100%]"}>
                            <h1 className={"m-0 p-0 text-5xl capitalize text-left font-roboto-mono"}>{data.weather[0].description}</h1>
                        </div>
                        <h1 className={"absolute m-0 p-0 text-8xl bottom-5 left-5"}>{data.main.temp.toFixed(0)}°</h1>

                        {/* Get location button */}
                        {yesPosition ? null : (
                            <>
                                {buttonHover &&
                                    <p className={"p-2 rounded shadow-lg absolute bottom-14 right-5 transition-opacity duration-200 opacity-100 bg-transparent backdrop-blur text-center"}>
                                        May I access<br />your location?
                                    </p>}

                                {/* Location button */}
                                <button
                                    onClick={GetLocation}
                                    onMouseEnter={() => { setButtonHover(true); }}
                                    onMouseLeave={() => { setButtonHover(false); }}
                                    className={"absolute bottom-5 right-5 w-12 h-12 rounded-full bg-transparent shadow flex justify-center items-center hover:shadow-lg transition-shadow duration-200 backdrop-blur"}>
                                    <img className={"w-6 h-6"} src={LocationPin} alt={"location button"} />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
