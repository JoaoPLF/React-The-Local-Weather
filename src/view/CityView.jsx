import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import AnimatedPage from "../components/AnimatedPage";
import CurrentWeather from "../components/CurrentWeather";
import HourlyWeather from "../components/HourlyWeather";

const CityView = ({ title }) => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let docTitle = params.city;

    if (docTitle) {
      if (params.state !== "undefined") docTitle += (", " + params.state);
    }
    else docTitle = title;

    document.title = `${docTitle} | The Local Weather`
  }, [title, params.city, params.state]);

  const removeCity = () => {
    const cities = JSON.parse(localStorage.getItem("savedCities"));
    const updatedCities = cities.filter(city => city.id !== searchParams.get("id"));
    localStorage.setItem("savedCities", JSON.stringify(updatedCities));

    navigate("/");
  };

  return (
    <AnimatedPage>
      <div className="flex flex-col flex-1 items-center">
        {/* PREVIEW */}
        {searchParams.get("preview") &&
          <div className="text-white p-4 bg-weather-secondary w-full text-center">
            <p>You are currently previewing this city, click the "+" icon to start tracking it.</p>
          </div>
        }

        {/* WEATHER OVERVIEW */}
        <CurrentWeather lat={searchParams.get("lat")} lon={searchParams.get("lon")} />
        <hr className="bordewr-white border-opacity-10 border w-full" />

        {/* HOURLY WEATHER */}
        <HourlyWeather lat={searchParams.get("lat")} lon={searchParams.get("lon")} />

        {searchParams.get("id") &&
          <div className="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500" onClick={removeCity}>
            <i className="fa-solid fa-trash" />
            <p>Remove City</p>
          </div>
        }
      </div>
    </AnimatedPage>
  );

};

export default CityView;