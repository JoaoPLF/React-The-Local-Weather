import { useState, useEffect } from "react";
import HourlyWeatherSkeleton from "./HourlyWeatherSkeleton";

const HourlyWeather = ({ lat, lon }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (weather === null) {
      (async () => {
        try {
          const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=8e656790619472d6bb427d4b9212af0d`);
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
    const dateString = (hour) => {
      return new Date(hour).toLocaleDateString("en-us", { month: "short", day: "2-digit" });
    }

    const hourString = (hour) => {
      return new Date(hour).toLocaleTimeString("en-us", { hour: "numeric" });
    };

    return (
      <div className="max-w-screen-md w-full py-12">
        <div className="mx-8 text-white">
          <h2 className="mb-4">Hourly Weather</h2>
          <div className="flex gap-10 overflow-x-scroll">
            {weather.list.map((hour, index) => (
              <div key={index} className="flex flex-col gap-4 items-center">
                <p className="whitespace-nowrap text-md">
                  {dateString(hour.dt * 1000)}
                </p>
                <p className="whitespace-nowrap text-md">
                  {hourString(hour.dt * 1000)}
                </p>
                <img
                  className="w-auto h-[50px] object-cover"
                  src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                  alt=""
                />
                <p className="text-xl">
                  {Math.round(hour.main.temp)}&deg;C
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  else return (
    <HourlyWeatherSkeleton />
  );
};

export default HourlyWeather;