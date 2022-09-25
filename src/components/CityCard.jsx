import { createSearchParams, useNavigate } from "react-router-dom";

const CityCard = ({ city }) => {
  const navigate = useNavigate();

  const goToCityView = () => {
    const params = { lat: city.coords.lat, lon: city.coords.lon, id: city.id };

    navigate({
      pathname: `/React-The-Local-Weather/weather/${city.state}/${city.city}`,
      search: `?${createSearchParams(params)}`
    });
  };

  return (
    <div className="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer" onClick={goToCityView}>
      <div className="flex flex-col flex-1">
        <h2 className="text-3xl">{city.city}</h2>
        <h3>{city.state}</h3>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-3xl self-end">
          {Math.round(city.weather.main.temp)}&deg;C
        </p>
        <div className="flex gap-2">
          <span className="text-xs">
            H: {Math.round(city.weather.main.temp_max)}&deg;C
          </span>
          <span className="text-xs">
            L: {Math.round(city.weather.main.temp_min)}&deg;C
          </span>
        </div>
      </div>
    </div>
  );
};

export default CityCard;