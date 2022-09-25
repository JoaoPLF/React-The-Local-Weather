import { useState, useEffect } from "react";
import CityCard from "./CityCard";
import axios from "axios";
import CityCardSkeleton from "./CityCardSkeleton";

const CityList = () => {
  const [savedCities, setSavedCities] = useState(null);

  useEffect(() => {
    (async () => {
      if (savedCities === null) {
        if (localStorage.getItem("savedCities")) {
          const cities = JSON.parse(localStorage.getItem("savedCities"));
  
          const weatherData = await Promise.all(cities.map(async (city) => (
            await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lon}&units=metric&appid=8e656790619472d6bb427d4b9212af0d`)
          )));

          const citiesWeather = weatherData.map((value, index) => ({ ...cities[index], weather: value.data }));

          setSavedCities(citiesWeather);
        }
        else setSavedCities([])
      }

      await new Promise(res => setTimeout(res, 1000));
    })();
  }, [savedCities]);

  if (savedCities) {
    return (
      <>
        {savedCities.length === 0 ?
          (<p>No locations added. To start tracking a location, search in the field above.</p>) :
          savedCities.map((city, index) => (
            <CityCard city={city} key={index} />
          ))
        }
      </>
    );
  }
  else return (
    <CityCardSkeleton />
  );
};

export default CityList;