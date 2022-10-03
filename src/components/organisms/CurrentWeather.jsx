import React, { useEffect } from "react";
import { Temperature } from "../atoms/Temperature";
import { Image } from "../atoms/Image";
import background from "../../assets/Cloud-background.png";
import { formatDate } from "../../services/formatDate";
import { getCurrentWeather } from "../../features/currentWeather/currentWeatherSlice";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../atoms/Spinner";

function CurrentWeather({
  location,
  temperatureType,
  renderUserPosition,
  setShowSearchingSection,
}) {
  const { weekDay, monthDay, month } = formatDate(new Date());

  const { currentWeatherData, error, loading, message } = useSelector(
    (state) => state.currentWeather
  );

  const dispatch = useDispatch();

  useEffect(() => {
    location.lat !== 0 && dispatch(getCurrentWeather(location));
  }, [dispatch, location]);

  return (
    <div className="current-weather-section">
      <div
        className="inner-wrapper"
        style={{ backgroundImage: `url(${background})` }}
      ></div>
      {error ? (
        <div
          className="alert alert-danger"
          role="alert"
          style={{
            width: "90%",
            position: "absolute",
            top: "45%",
            zIndex: 6,
          }}
        >
          {message}
        </div>
      ) : loading ? (
        <Spinner />
      ) : (
        <>
          <button
            className="current-weather-section-search_button"
            onClick={() => setShowSearchingSection(true)}
          >
            Search for places
          </button>
          <button
            className="current-weather-section-location-icon"
            onClick={renderUserPosition}
          >
            <i className="fa-solid fa-location-crosshairs"></i>
          </button>
          <Image
            data={currentWeatherData}
            className="current-weather-section-image"
          />
          <p className="current-weather-section-temperature">
            <Temperature
              temp={currentWeatherData.main?.temp}
              temperatureType={temperatureType}
            />
          </p>
          <p className="current-weather-section-title">
            {currentWeatherData.weather?.[0].main}
          </p>
          <p className="current-weather-section-date">
            Today &bull; {weekDay} {monthDay} {month}
          </p>
          <p className="current-weather-section-location">
            <i className="fa-solid fa-location-dot"> </i>{" "}
            {currentWeatherData?.name}, {currentWeatherData.sys?.country}
          </p>
        </>
      )}
    </div>
  );
}

export default CurrentWeather;
