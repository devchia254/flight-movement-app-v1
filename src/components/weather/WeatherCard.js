import React, { useState, useEffect } from "react";
import kkImage from "../../assets/mtKinabaluCrop.jpg";
import sdkImage from "../../assets/sdkCrop.jpg";
import kulImage from "../../assets/klCrop.jpg";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";

// API Key for Openweather
const api = {
  key: "5c1fb17063422a6d6abcfbd2c228fd59",
  base: "https://api.openweathermap.org/data/2.5/",
};

const useStyles = makeStyles((theme) => ({
  mainBg: {
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    borderRadius: "inherit",
  },

  kkBg: {
    backgroundImage: `url(${kkImage})`,
  },

  sdkBg: {
    backgroundImage: `url(${sdkImage})`,
  },

  kulBg: {
    backgroundImage: `url(${kulImage})`,
  },

  warmBg: {},

  cardBox: {
    // minHeight: "60vh",
    backgroundImage:
      "linear-gradient(340deg, rgba(114,237,242, 0.3),rgba(81,81,229, 0.7))",
    // "linear-gradient(to bottom, rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.75))",

    padding: "25px",
    borderRadius: "inherit",
  },

  contentBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  headerBox: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
  },

  headerBoxTemp: {
    color: "#fff",

    textShadow: "3px 3px rgba(50, 50, 70, 0.5)",
  },

  headerBoxDate: {
    color: "#fff",
    fontWeight: 600,
  },

  weatherBox: {
    textAlign: "center",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },

  weatherDesc: {
    color: "#fff",
    textShadow: "1px 1px rgba(50, 50, 70, 0.5)",
    fontWeight: "Bold",
    // boxShadow: "3px 6px rgba(0, 0, 0, 0.2)",
  },

  footerBoxGrid2: {
    color: "#fff",
    textShadow: "1px 1px rgba(50, 50, 70, 0.5)",
    margin: theme.spacing(2, 0),
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
  },

  footerItems: {
    justifySelf: "center",
  },

  locationBox: {
    width: "100%",
    margin: theme.spacing(1, 0),
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  locationBtn: {
    borderRadius: theme.spacing(3),
    padding: theme.spacing(0.5),
    fontWeight: 600,
    margin: theme.spacing(0.5, 2),
  },
}));

function WeatherCard() {
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

  const getWeatherIcon = (data) => {
    const link = `http://openweathermap.org/img/wn/${data}@2x.png`;
    return link;
  };

  const changeBg = (name) => {
    switch (name) {
      case "Kota Kinabalu":
        return classes.kkBg;
      case "Sandakan":
        return classes.sdkBg;
      case "Kuala Lumpur":
        return classes.kulBg;
      default:
        return null;
    }
  };

  // Capitalise Words
  const capitalise = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const classes = useStyles();
  const moment = require("moment"); // require Moment library

  const displayState = {
    LOCATION: location,
    WEATHER: weather,
  };
  return (
    <React.Fragment>
      <div
        className={
          typeof weather.main != "undefined"
            ? `${classes.mainBg} ${changeBg(weather.name)}`
            : `${classes.mainBg}`
        }
      >
        <div className={classes.cardBox}>
          {typeof weather.main != "undefined" ? (
            <div className={classes.contentBox}>
              <div className={classes.headerBox}>
                <div className={classes.headerBoxDate}>
                  <Typography variant="h5" style={{ fontWeight: 700 }}>
                    {/* {dayHeader(new Date())} */}
                    {moment().format("dddd")}
                  </Typography>
                  <Typography variant="h6">
                    {/* {dateBuilder(new Date())} */}
                    {moment().format("D MMM YYYY")}
                  </Typography>
                  <Typography variant="body1">
                    <LocationOnIcon
                      style={{ fontSize: "1em", marginRight: "0.2em" }}
                    />
                    {weather.name}
                  </Typography>
                </div>
                <div className={classes.headerBoxTemp}>
                  <Typography variant="h3">
                    {Math.round(weather.main.temp)}°C
                  </Typography>
                </div>
              </div>
              <div className={classes.weatherBox}>
                <div className={classes.weatherIcon}>
                  <img
                    alt={weather.weather[0].main}
                    src={getWeatherIcon(weather.weather[0].icon)}
                    width="100"
                    height="100"
                  />
                </div>
                <div className={classes.weatherDesc}>
                  <Typography variant="h5" style={{ fontWeight: 700 }}>
                    {capitalise(weather.weather[0].description)}
                  </Typography>
                </div>
              </div>
              <div className={classes.footerBoxGrid2}>
                <Typography className={classes.footerItems} variant="body1">
                  Wind: {weather.wind.speed}m/s
                  <br></br>
                  Cloudiness: {weather.clouds.all}%
                </Typography>
                <Typography className={classes.footerItems} variant="body1">
                  Humidity: {weather.main.humidity}%<br></br>
                  Visibility: {weather.visibility}m
                </Typography>
              </div>
            </div>
          ) : (
            // Show something if fetching fails
            <div className={classes.contentBox}>
              <div className={classes.headerBox}>
                <div className={classes.headerBoxDate}>
                  <Typography variant="h5" style={{ fontWeight: 700 }}>
                    Day is here
                  </Typography>
                  <Typography variant="h6">Date is here</Typography>
                  <Typography variant="body1">
                    <LocationOnIcon
                      style={{ fontSize: "1em", marginRight: "0.2em" }}
                    />
                    Location is here
                  </Typography>
                </div>
                <div className={classes.headerBoxTemp}>
                  <Typography variant="h3">- °C</Typography>
                </div>
              </div>
              <div className={classes.weatherBox}>
                <div className={classes.weatherIcon}>
                  <img
                    alt="Icon is here"
                    // src={getWeatherIcon(weather.weather[0].icon)}
                    width="100"
                    height="100"
                  />
                </div>
                <div className={classes.weatherDesc}>
                  <Typography variant="h5" style={{ fontWeight: 700 }}>
                    Description is here
                  </Typography>
                </div>
              </div>
              <div className={classes.footerBoxGrid2}>
                <Typography className={classes.footerItems} variant="body1">
                  Wind: - m/s
                  <br></br>
                  Cloudiness: - %
                </Typography>
                <Typography className={classes.footerItems} variant="body1">
                  Humidity: - %<br></br>
                  Visibility: - m
                </Typography>
              </div>
            </div>
          )}
          <div className={classes.locationBox}>
            <Button
              variant="contained"
              size="large"
              className={classes.locationBtn}
              name={cityId.kotaKinabalu}
              onClick={getCityId}
            >
              KK
            </Button>
            <Button
              variant="contained"
              size="large"
              className={classes.locationBtn}
              name={cityId.sandakan}
              onClick={getCityId}
            >
              SDK
            </Button>
            <Button
              variant="contained"
              size="large"
              className={classes.locationBtn}
              name={cityId.kualaLumpur}
              onClick={getCityId}
            >
              KUL
            </Button>
          </div>
        </div>
      </div>
      <pre>{JSON.stringify(displayState, null, 2)}</pre>
    </React.Fragment>
  );
}

export default WeatherCard;
