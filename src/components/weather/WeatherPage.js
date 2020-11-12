import React, { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";
import WeatherInfo from "./WeatherInfo";
// Custome Theme
import CustomTheme from "../../assets/theme/CustomTheme";
// Material UI
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

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
    width: "100%",
  },

  item1: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      justifyContent: "flex-end",
    },
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },

  item2: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      justifyContent: "flex-start",
    },
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
}));

function WeatherPage() {
  const classes = useStyles();

  // OpenWeatherAPI city IDs
  const cityId = {
    kotaKinabalu: "1733432",
    sandakan: "1734052",
    kualaLumpur: "1733046",
  };

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
      // // Testing fetch method
      // console.log(`Weather fetched after 15 minutes`);
      // console.log(`---------------------------------`);

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

  return (
    <React.Fragment>
      <ThemeProvider theme={CustomTheme.weatherTheme}>
        <Grid container className={classes.weatherPage}>
          <Grid item md={6} sm={12} xs={12} className={classes.item1}>
            <WeatherCard
              getCityId={getCityId}
              cityId={cityId}
              weather={weather}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12} className={classes.item2}>
            <WeatherInfo
              getCityId={getCityId}
              cityId={cityId}
              weather={weather}
            />
          </Grid>
        </Grid>
      </ThemeProvider>
      {/* <pre>{JSON.stringify(displayState, null, 2)}</pre> */}
    </React.Fragment>
  );
}

export default WeatherPage;
