import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CurrentWeatherSkeleton from "./CurrentWeatherSkeleton";

const CurrentWeather = ({ lat, lon }) => {
  const [weather, setWeather] = useState(null);
  const params = useParams();

  useEffect(() => {
    if (weather === null) {
      (async () => {
        try {
          const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=8e656790619472d6bb427d4b9212af0d`);
          const weatherJson = await weatherData.json();
          setWeather(weatherJson);
        }
        catch (err) {
          console.log(err);
        }

        await new Promise(res => setInterval(res, 1000));
      })();
    }
  }, [weather, lat, lon]);

  if (weather) {
    const dateString = new Date(weather.dt * 1000).toLocaleDateString("en-us", { weekday: "short", day: "2-digit", month: "long" });
    const timeString = new Date(weather.dt * 1000).toLocaleTimeString("en-us", { timeStyle: "short" });

    return (
      <div className="flex flex-col items-center text-white py-12">
        <h1 className="text-4xl mb-2">{params.city}</h1>
        <p className="text-sm mb-12">
          {`${dateString} ${timeString}`}
        </p>
        <p className="text-8xl mb-8">
          {`${Math.round(weather.main.temp)}`}&deg;C
        </p>
        <p>
          {`Feels like ${Math.round(weather.main.feels_like)}`}&deg;C
        </p>
        <p className="capitalize">
          {weather.weather[0].description}
        </p>
        <img
          className="w-[150px] h-autoq"
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt=""
        />
      </div>
    );
  }
  else {
    return (
      <CurrentWeatherSkeleton />
    );
  }

};

export default CurrentWeather;