import React, { useState, useEffect } from "react";

import WeatherCard from "./WeatherCard";
import WeatherInfo from "./WeatherInfo";

import CustomTheme from "../../assets/theme/CustomTheme"; // Testing custom theme

import { makeStyles, ThemeProvider } from "@material-ui/core/styles";

// API Key for Openweather
const api = {
  key: "5c1fb17063422a6d6abcfbd2c228fd59",
  base: "https://api.openweathermap.org/data/2.5/",
};

const useStyles = makeStyles((theme) => ({
  weatherPage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",

    // background: "darkorange",
    // border: "2px dashed yellow",
  },
}));

function WeatherPage() {
  // OpenWeatherAPI city IDs
  const cityId = {
    kotaKinabalu: "1733432",
    sandakan: "1734052",
    kualaLumpur: "1733046",
  };

  const classes = useStyles();
  const [location, setLocation] = useState(cityId.kotaKinabalu);
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    // Fetch Weather Data from API
    const fetchWeatherApi = async () => {
      try {
        // Fetch response
        const response = await fetch(
          `${api.base}weather?id=${location}&units=metric&APPID=${api.key}`,
          { signal: signal }
        );

        // Convert response to JSON
        const result = await response.json();

        // Set weather details to state
        setWeather(result);
      } catch (error) {
        const resMessage =
          (error.response && error.response.data.message) ||
          error.message ||
          error.toString();

        if (error.name === "AbortError") {
          console.log("Fetching Weather API was aborted");
        } else if (resMessage) {
          console.log("Error: ", resMessage);
        }
      }
    };

    // Call Fetch function after first mount
    fetchWeatherApi();

    // Set interval for fetching weather every 15 minutes
    const weatherTimer = setInterval(() => {
      // REMOVE AT PRODUCTION
      console.log(`Weather fetched after 15 minutes`);
      console.log(`---------------------------------`);
      // Only below is important, above is for testing only
      fetchWeatherApi();
    }, 900000);

    // Clean up UseEffect Hook
    return () => {
      // Clear timer when removed from DOM
      clearInterval(weatherTimer);
      abortController.abort();
    };
  }, [location]);

  // Get City ID based on onClick Event
  const getCityId = (e) => {
    setLocation(e.currentTarget.name);
  };

  // const displayState = {
  //   LOCATION: location,
  //   WEATHER: weather,
  // };
  return (
    <React.Fragment>
      <div className={classes.weatherPage}>
        <ThemeProvider theme={CustomTheme.weatherTheme}>
          <WeatherCard
            getCityId={getCityId}
            cityId={cityId}
            weather={weather}
          />
          <WeatherInfo
            getCityId={getCityId}
            cityId={cityId}
            weather={weather}
          />
        </ThemeProvider>
      </div>
      {/* <pre>{JSON.stringify(displayState, null, 2)}</pre> */}
    </React.Fragment>

    // </React.Fragment>
  );
}

export default WeatherPage;
