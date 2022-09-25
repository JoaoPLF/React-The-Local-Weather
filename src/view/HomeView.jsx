import { useState, useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import AnimatedPage from "../components/AnimatedPage";
import CityList from "../components/CityList";

const HomeView = ({ title }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${title} | The Local Weather`
  }, [title]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchText !== "") {
        try {
          const result = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchText}&limit=5&appid=8e656790619472d6bb427d4b9212af0d`);
          const resultJson = await result.json();
          setSearchResult(resultJson);
          setSearchError(false);
        }
        catch (err) {
          setSearchError(true);
        }
      }
      else {
        setSearchResult(null);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  const previewCity = (location) => {
    const params = { lat: location.lat, lon: location.lon, preview: true };

    navigate({
      pathname: `/weather/${location.state}/${location.name}`,
      search: `?${createSearchParams(params)}`
    });
  };

  return (
    <AnimatedPage>
      <main className="container text-white">
        <div className="pt-4 mb-8 relative">
          <input type="text" placeholder="Search for a city or state"
            className="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
            value={searchText} onChange={(e) => setSearchText(e.target.value)}
          />
          {searchResult &&
            <ul className="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]">
              {searchError ?
                <p>Sorry, something went wrong, please try again.</p> :
                searchResult.length > 0 ?
                  searchResult.map((result, index) => (
                    <li key={index} className="py-2 cursor-pointer" onClick={() => previewCity(result)}>
                      {`${result.name}, ${result.state ? result.state + ", " : ""}${result.country}`}
                    </li>
                  )) :
                  <p>No results match your query, try a different term.</p>
              }
            </ul>
          }
        </div>
        <div className="flex flex-col gap-4">
          <CityList />
        </div>
      </main>
    </AnimatedPage>
  );
};

export default HomeView;