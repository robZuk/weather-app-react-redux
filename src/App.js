import React, { useState, useEffect } from "react";
import "./styles/main.scss";
import CurrentWeather from "./components/organisms/CurrentWeather";
import ForecastWeather from "./components/organisms/ForecastWeather";
import HightlightsWeather from "./components/organisms/HightlightsWeather";
import Search from "./components/organisms/Search";
import Footer from "./components/atoms/Footer";

import { userCurrentPosition } from "./services/geolocation";

function App() {
  const [temperatureType, setTemperatureType] = useState("celsius");
  const [location, setLocation] = useState({ lat: 0, lon: 0 });
  const [showSearchingSection, setShowSearchingSection] = useState(false);

  function weatherUserCity(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    setLocation({ lat, lon });
  }

  function renderUserPosition() {
    userCurrentPosition(weatherUserCity);
  }

  useEffect(() => {
    renderUserPosition();
  }, []);

  return (
    <div className="App">
      <section className="section1">
        <CurrentWeather
          location={location}
          temperatureType={temperatureType}
          renderUserPosition={renderUserPosition}
          setShowSearchingSection={setShowSearchingSection}
        />
        <Search
          showSearchingSection={showSearchingSection}
          setShowSearchingSection={setShowSearchingSection}
          setLocation={setLocation}
        />
      </section>
      <section className="section2">
        <ForecastWeather
          temperatureType={temperatureType}
          setTemperatureType={setTemperatureType}
          location={location}
        />
        <HightlightsWeather location={location} />
        <Footer />
      </section>
    </div>
  );
}

export default App;
