import { useState } from "react";
import { matchPath, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { uid } from "uid";
import BaseModal from "./BaseModal";

const SiteNavigation = () => {
  const [modalActive, setModalActive] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  const returnHome = () => {
    navigate("/");
  };

  const toggleModal = () => {
    setModalActive(!modalActive);
  };

  const addCity = () => {
    const match = matchPath("/weather/:state/:city", pathname);
    const storageCities = (JSON.parse(localStorage.getItem("savedCities")) || []);

    const id = uid();

    const locationObj = {
      id,
      state: match.params.state,
      city: match.params.city,
      coords: {
        lat: searchParams.get("lat"),
        lon: searchParams.get("lon")
      }
    };

    localStorage.setItem("savedCities", JSON.stringify([ ...storageCities, locationObj ]));

    searchParams.delete("preview");
    searchParams.append("id", id);
    setSearchParams(searchParams);
  };

  return (
    <header className="sticky top-0 bg-weather-primary shadow-lg">
      <nav className="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
        <div className="flex items-center gap-3 cursor-pointer" onClick={returnHome}>
          <i className="fa-solid fa-sun text-2xl" />
          <p className="text-2xl">The Local Weather</p>
        </div>

        <div className="flex gap-3 flex-1 justify-end">
          <i className="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer" onClick={toggleModal} />
          {searchParams.get("preview") &&
            <i className="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer" onClick={addCity} />
          }
        </div>

        <BaseModal modalActive={modalActive} closeModal={toggleModal}>
          <div className="text-black">
            <h1 className="text-2xl mb-1">About:</h1>
            <p className="mb-4">
              The Local Weather allows you to track the current and
              future weather of cities of your choosing.
            </p>
            <h2 className="text-2xl">How it works:</h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                Search for your city by entering the name into the
                search bar.
              </li>
              <li>
                Select a city within the results, this will take
                you to the current weather for your selection.
              </li>
              <li>
                Track the city by clicking on the "+" icon in the
                top right. This will save the city to view at a
                later time on the home page.
              </li>
            </ol>

            <h2 className="text-2xl">Removing a city</h2>
            <p>
              If you no longer wish to track a city, simply select
              the city within the home page. At the bottom of the
              page, there will be am option to delete the city.
            </p>
          </div>
        </BaseModal>
      </nav>
    </header>
  );
};

export default SiteNavigation;