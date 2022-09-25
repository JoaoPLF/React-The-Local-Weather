import { Routes, Route } from "react-router-dom";
import SiteNavigation from './components/SiteNavigation';
import CityView from "./view/CityView";
import HomeView from "./view/HomeView";

function App() {
  return (
    <div className="flex flex-col min-h-screen font-Roboto bg-weather-primary">
      <SiteNavigation />
      <Routes>
        <Route path="/React-The-Local-Weather/" element={<HomeView title="Home" />} />
        <Route path="/React-The-Local-Weather/weather/:state/:city" element={<CityView title="Weather" />} />
      </Routes>
    </div>
  );
}

export default App;
