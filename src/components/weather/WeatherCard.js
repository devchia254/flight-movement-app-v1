import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const api = {
  key: "5c1fb17063422a6d6abcfbd2c228fd59",
  base: "https://api.openweathermap.org/data/2.5/",
};

const useStyles = makeStyles((theme) => ({
  coldBg: {
    /* background-image: "url('./assets/cold-bg.jpg')", */
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    transition: "0.4 ease",
  },

  warmBg: {},

  cardBox: {
    minHeight: "60vh",
    backgroundImage:
      "linear-gradient(to bottom, rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.75))",
    padding: "25px",
  },

  searchBox: {
    width: "100%",
    margin: "0 0 40px",
  },

  searchBoxBar: {
    display: "block",
    width: "100%",
    padding: "15px",

    appearance: "none",
    background: "none",
    border: "none",
    outline: "none",

    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: "0px 0px 16px 16px",
    marginTop: "-25px",

    boxShadow: "0px 5px rgba(0, 0, 0, 0.2)",

    color: "#313131",
    fontSize: "20px",

    transition: "0.4s ease",

    "&:focus": {
      backgroundColor: "rgba(255, 255, 255, 0.75)",
    },
  },

  contentBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  locationBox: {
    textAlign: "center",
  },

  locationBoxName: {
    color: "#fff",
    fontSize: "2.5em",
    fontWeight: 500,
    textShadow: "3px 3px rgba(50, 50, 70, 0.5)",
  },

  locationBoxDate: {
    color: "#fff",
    fontSize: "1.5em",
    fontWeight: 300,
    fontStyle: "italic",
    textShadow: "2px 2px rgba(50, 50, 70, 0.5)",
  },

  weatherBox: {
    textAlign: "center",
  },

  weatherBoxTemp: {
    margin: "30px auto",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "16px",

    padding: "15px 25px",

    color: "#fff",
    fontSize: "3em",
    fontWeight: 900,

    textShadow: "3px 6px rgba(50, 50, 70, 0.5)",
    boxShadow: "3px 6px rgba(0, 0, 0, 0.2)",
  },

  weatherBoxDesc: {
    color: "#fff",
    fontSize: "2.5em",
    fontWeight: 700,
    textShadow: "3px 3px rgba(50, 50, 70, 0.5)",
  },
}));

function WeatherCard() {
  const [query, setQuery] = useState("Kota Kinabalu");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`
      );
      const result = await response.json();
      setWeather(result);
    };
    fetchData();
  }, [query]);
  // console.log(weather);

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const getPlace = (e) => {
    // e.preventDefault();
    console.log(e.currentTarget);
    setQuery(e.currentTarget.name);
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const classes = useStyles();

  return (
    // <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
    // <div className="cold-bg">
    <div>
      <div className={classes.cardBox}>
        <div className={classes.searchBox}>
          <input
            type="text"
            className={classes.searchBoxBar}
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        <Button
          variant="contained"
          size="large"
          name="Sandakan"
          onClick={getPlace}
        >
          SDK
        </Button>
        <Button
          variant="contained"
          size="large"
          name="Kota Kinabalu"
          onClick={getPlace}
        >
          KK
        </Button>
        <Button variant="contained" size="large" name="Ipoh" onClick={getPlace}>
          IPH
        </Button>
        {typeof weather.main != "undefined" ? (
          <div className={classes.contentBox}>
            <div className={classes.locationBox}>
              <div className={classes.locationBoxName}>
                {weather.name}, {weather.sys.country}
              </div>
              <div className={classes.locationBoxDate}>
                {dateBuilder(new Date())}
              </div>
            </div>
            <div className={classes.weatherBox}>
              <div className={classes.weatherBoxTemp}>
                {Math.round(weather.main.temp)}°c
              </div>
              <div className={classes.weatherBoxDesc}>
                {weather.weather[0].main}
              </div>
            </div>
          </div>
        ) : (
          <div className={classes.contentBox}>
            <div className={classes.locationBox}>
              <div className={classes.locationBoxName}>Location is here</div>
              <div className={classes.locationBoxDate}>
                {dateBuilder(new Date())}
              </div>
            </div>
            <div className={classes.weatherBox}>
              <div className={classes.weatherBoxTemp}>-°c</div>
              <div className={classes.weatherBoxDesc}>Weather is here</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherCard;
