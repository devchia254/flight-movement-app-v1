import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";

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
    borderRadius: "inherit",
  },

  // searchBox: {
  //   width: "100%",
  //   margin: "0 0 40px",
  // },

  // searchBoxBar: {
  //   display: "block",
  //   width: "100%",
  //   padding: "15px",

  //   appearance: "none",
  //   background: "none",
  //   border: "none",
  //   outline: "none",

  //   backgroundColor: "rgba(255, 255, 255, 0.5)",
  //   borderRadius: "0px 0px 16px 16px",
  //   marginTop: "-25px",

  //   boxShadow: "0px 5px rgba(0, 0, 0, 0.2)",

  //   color: "#313131",
  //   fontSize: "20px",

  //   transition: "0.4s ease",

  //   "&:focus": {
  //     backgroundColor: "rgba(255, 255, 255, 0.75)",
  //   },
  // },

  contentBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  headerBox: {
    // textAlign: "center",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
  },

  headerBoxTemp: {
    color: "#fff",
    // fontSize: "2.5em",
    // fontWeight: 500,
    textShadow: "3px 3px rgba(50, 50, 70, 0.5)",
  },

  headerBoxDate: {
    color: "#fff",
    // fontSize: "1.5em",
    // fontWeight: 300,
    // fontStyle: "italic",
    textShadow: "2px 2px rgba(50, 50, 70, 0.5)",
  },

  weatherBox: {
    textAlign: "center",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },

  weatherDesc: {
    color: "#fff",
    textShadow: "3px 6px rgba(50, 50, 70, 0.5)",
    // fontSize: "2em",
    // fontWeight: 900,

    // padding: "15px 25px",
    // boxShadow: "3px 6px rgba(0, 0, 0, 0.2)",
    // margin: "30px auto",
    // backgroundColor: "rgba(255, 255, 255, 0.2)",
    // borderRadius: "16px",
  },

  weatherBoxDesc: {
    color: "#fff",
    fontSize: "2.5em",
    fontWeight: 700,
    textShadow: "3px 3px rgba(50, 50, 70, 0.5)",
  },

  locationBox: {
    marginTop: theme.spacing(3),
  },
}));

// OpenWeatherAPI city IDs
const cityId = {
  kotaKinabalu: "1733432",
  sandakan: "1734052",
  kualaLumpur: "1733046",
};

function WeatherCard() {
  const [location, setLocation] = useState(cityId.kotaKinabalu);
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${api.base}weather?id=${location}&units=metric&APPID=${api.key}`
      );
      const result = await response.json();
      setWeather(result);
      console.log(result);
    };
    fetchData();
  }, [location]);

  const getCityId = (e) => {
    setLocation(e.currentTarget.name);
  };

  const getWeatherIcon = (data) => {
    const link = `http://openweathermap.org/img/wn/${data}@2x.png`;
    return link;
  };

  // const capitaliseDesc = (string) => {}

  const dateBuilder = (d) => {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${date} ${month} ${year}`;
  };

  const dayHeader = (d) => {
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
    return `${day}`;
  };

  // const weatherIcon = weather.weather[0].icon;
  // console.log(weather.weather[0].main);
  const classes = useStyles();

  return (
    // <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
    // <div className="cold-bg">

    <div className={classes.cardBox}>
      {typeof weather.main != "undefined" ? (
        <div className={classes.contentBox}>
          <div className={classes.headerBox}>
            <div className={classes.headerBoxDate}>
              <Typography variant="h5">{dayHeader(new Date())}</Typography>
              <Typography variant="h6">{dateBuilder(new Date())}</Typography>
              <Typography variant="h7">{weather.name}</Typography>
            </div>
            <div className={classes.headerBoxTemp}>
              <Typography variant="h3">
                {Math.round(weather.main.temp)}°C
              </Typography>
            </div>
            {/* {weather.sys.country} */}
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
              <Typography variant="h5">
                {weather.weather[0].description}
              </Typography>
            </div>
            {/* <div className={classes.weatherBoxDesc}>
            </div> */}
            {/* {weather.weather[0].main} */}
          </div>
          <div className={classes.footerBox}>
            <Typography variant="h7">Wind: {weather.wind.speed}m/s</Typography>
            <Typography variant="h7">
              Humidity: {weather.main.humidity}%
            </Typography>
            <Typography variant="h7">
              Cloudiness: {weather.clouds.all}%
            </Typography>
            <Typography variant="h7">
              Visibility: {weather.visibility}m
            </Typography>
          </div>
        </div>
      ) : (
        <div className={classes.contentBox}>
          <div className={classes.headerBox}>
            <div className={classes.headerBoxTemp}>Location is here</div>
            <div className={classes.headerBoxDate}>
              {dateBuilder(new Date())}
            </div>
          </div>
          <div className={classes.weatherBox}>
            <div className={classes.weatherDesc}>-°c</div>
            <div className={classes.weatherBoxDesc}>Weather is here</div>
          </div>
        </div>
      )}
      <div className={classes.locationBox}>
        <Button
          variant="contained"
          size="large"
          name={cityId.kotaKinabalu}
          onClick={getCityId}
        >
          KK
        </Button>
        <Button
          variant="contained"
          size="large"
          name={cityId.sandakan}
          onClick={getCityId}
        >
          SDK
        </Button>
        <Button
          variant="contained"
          size="large"
          name={cityId.kualaLumpur}
          onClick={getCityId}
        >
          KUL
        </Button>
      </div>
    </div>
  );
}

export default WeatherCard;
