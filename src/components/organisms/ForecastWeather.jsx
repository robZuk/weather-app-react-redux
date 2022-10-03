import React, { useRef, useEffect } from "react";
import { Image } from "../atoms/Image";
import { Temperature } from "../atoms/Temperature";
import { formatDate } from "../../services/formatDate";
import Spinner from "../atoms/Spinner";
import { getForecastWeather } from "../../features/forecastWeather/forecastWeatherSlice";
import { useSelector, useDispatch } from "react-redux";

function ForecastWeather({ temperatureType, setTemperatureType, location }) {
  const celsiusIcon = useRef();
  const fahrenheitIcon = useRef();

  const { forecastWeatherData, error, loading, message } = useSelector(
    (state) => state.forecastWeather
  );
  const dispatch = useDispatch();

  useEffect(() => {
    location.lat !== 0 && dispatch(getForecastWeather(location));
  }, [dispatch, location]);

  function toogleIcons(icon) {
    if (!icon.current.classList.contains("active")) {
      fahrenheitIcon.current.classList.toggle("active");
      celsiusIcon.current.classList.toggle("active");
    }
  }
  function convertToFahrenheit() {
    setTemperatureType("fahrenheit");
  }
  function convertToCelsius() {
    setTemperatureType("celsius");
  }

  //removed current day
  const today = new Date().toISOString().slice(0, 10);
  const forecast5DayData = forecastWeatherData.list
    ?.map((item) => {
      return { ...item, dt_txt: item.dt_txt.slice(0, 10) };
    })
    .filter((item, index) => item.dt_txt !== today);

  //grouping data by date
  const groupByDate = forecast5DayData?.reduce((prev, current) => {
    const { dt_txt } = current;
    prev[dt_txt] = prev[dt_txt] || [];
    prev[dt_txt].push(current);
    return prev;
  }, {});

  return (
    <>
      <div className="icons-wrapper">
        <button
          className="celscius-icon active"
          ref={celsiusIcon}
          onClick={() => {
            convertToCelsius();
            toogleIcons(celsiusIcon);
          }}
        >
          &deg;C
        </button>
        <button
          className="fahrenheit-icon"
          ref={fahrenheitIcon}
          onClick={() => {
            convertToFahrenheit();
            toogleIcons(fahrenheitIcon);
          }}
        >
          &deg;F
        </button>
      </div>
      {error ? (
        <div
          className="alert alert-danger"
          role="alert"
          style={{
            width: "90%",
            position: "absolute",
            top: "45%",
          }}
        >
          {message}
        </div>
      ) : loading ? (
        <Spinner />
      ) : (
        <div className="forecast-weather-section">
          {Object.keys(groupByDate !== undefined && groupByDate).map((key) => (
            <div className="forecast-weather-section-day" key={key}>
              {key === formatDate(key).tomorrow.toISOString().slice(0, 10) ? (
                <div className="-title">Tomorrow</div>
              ) : (
                <div className="-title">
                  {formatDate(key).weekDay} {formatDate(key).monthDay}{" "}
                  {formatDate(key).month}
                </div>
              )}
              <Image
                data={
                  groupByDate[key][3]
                    ? groupByDate[key][3]
                    : groupByDate[key][groupByDate[key].length - 1]
                }
              />
              <div className="forecast-weather-section-day-temperatures">
                <p>
                  <Temperature
                    temp={Math.min(
                      ...groupByDate[key].map((item) => item.main.temp_min)
                    )}
                    temperatureType={temperatureType}
                  />
                </p>
                <p>
                  <Temperature
                    temp={Math.max(
                      ...groupByDate[key].map((item) => item.main.temp_max)
                    )}
                    temperatureType={temperatureType}
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ForecastWeather;
