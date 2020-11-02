import React from "react";
import "../../assets/icon/weather-icons.min.css";
import "../../assets/icon/weather-icons-wind.min.css";
import kkImage from "../../assets/img/mtKinabaluCrop.jpg";
import sdkImage from "../../assets/img/sdkCrop.jpg";
import kulImage from "../../assets/img/klCrop.jpg";

import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const useStyles = makeStyles((theme) => ({
  mainBg: {
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    // borderRadius: "inherit",
    borderRadius: "1em",

    width: "25vw", // width of card
    height: "80vh",
    // maxHeight: "80vh",
    color: "#ffffff",
    // padding: theme.spacing(1),
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
      "linear-gradient(315deg, rgba(114,237,242, 0.6),rgba(81,81,229, 1))",
    // "linear-gradient(to bottom, rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.75))",

    padding: "2rem",
    borderRadius: "inherit", // inherits from mainBg
    height: "inherit", // inherits from mainBg
  },

  contentBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",

    // background: "chocolate",
    // border: "2px solid green",
  },

  headerBox: {
    display: "flex",
    justifyContent: "center",
    // justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
    marginBottom: theme.spacing(2),

    // background: "salmon",
    // border: "2px dashed blue",
  },

  // headerBoxTemp: {
  //   // color: "#fff",
  //   // textShadow: "3px 3px rgba(50, 50, 70, 0.5)",
  // },

  // headerBoxDate: {
  //   // color: "#fff",
  //   fontWeight: 600,
  // },

  weatherBox: {
    textAlign: "center",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(2),

    // background: "darkorange",
    // border: "2px dashed yellow",
  },

  icon: {
    fontSize: "6rem",
    margin: theme.spacing(3, 0),
    // color: "#ffffff",
  },

  // weatherDesc: {
  //   // color: "#fff",
  //   // textShadow: "1px 1px rgba(50, 50, 70, 0.5)",
  //   // fontWeight: "Bold",
  //   // boxShadow: "3px 6px rgba(0, 0, 0, 0.2)",
  // },

  footerBox: {
    // display: "flex",
    // alignItems: "center",
    width: "100%",
    // margin: theme.spacing(2, 0),
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
    height: "100%",

    // background: "indigo",
    // border: "2px dashed rosybrown",
  },

  footerItem: {
    // justifySelf: "center",
    // background: "salmon",
    // border: "1px solid black",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    // background: "chocolate",
    // border: "1px solid green",
  },

  // footerBoxGrid2: {
  //   color: "#fff",
  //   textShadow: "1px 1px rgba(50, 50, 70, 0.5)",
  //   margin: theme.spacing(2, 0),
  //   width: "100%",
  //   display: "grid",
  //   gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
  // },

  // footerItems: {
  //   justifySelf: "center",
  // },
}));

export default function WeatherCard(props) {
  const classes = useStyles();
  const moment = require("moment"); // require Moment library

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

  const { weather } = props;

  return (
    // <React.Fragment>
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
              <Typography variant="h5" style={{ marginBottom: "0.5rem" }}>
                {moment().format("dddd D MMM YYYY")}
              </Typography>
              <Typography
                variant="h6"
                style={{ display: "flex", alignItems: "center" }}
              >
                <LocationOnIcon />
                {weather.name}
              </Typography>
              {/* <div className={classes.headerBoxDate}>
                <Typography variant="h6" style={{ fontWeight: 700 }}>
                  {moment().format("dddd")}
                </Typography>
                <Typography variant="body1">
                  {moment().format("D MMM YYYY")}
                </Typography>
              </div> */}
            </div>
            <div className={classes.weatherBox}>
              <div className={classes.weatherIcon}>
                <i
                  className={`wi wi-owm-${weather.weather[0].id} ${classes.icon}`}
                ></i>
              </div>
              <div className={classes.headerBoxTemp}>
                <Typography
                  variant="h4"
                  style={{ fontWeight: "700", marginBottom: "0.5rem" }}
                >
                  {Math.round(weather.main.temp)}°C
                </Typography>
              </div>
              <div className={classes.weatherDesc}>
                <Typography variant="h6" style={{ fontWeight: 700 }}>
                  {capitalise(weather.weather[0].description)}
                </Typography>
              </div>
            </div>
            <div className={classes.footerBox}>
              <div className={classes.footerItem}>
                <i
                  className={`wi wi-wind towards-${weather.wind.deg}-deg`}
                  style={{ fontSize: "2.5em" }}
                ></i>{" "}
                <Typography
                  variant="body2"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  Wind {weather.wind.speed}m/s
                </Typography>
              </div>
              <div className={classes.footerItem}>
                <Typography variant="h5">
                  {Math.round(weather.main.feels_like)}°C
                </Typography>
                <Typography variant="body2">Real Feel</Typography>
              </div>
            </div>
            {/* <div className={classes.footerBoxGrid2}>
              <Typography className={classes.footerItems} variant="body1">
                Wind: {weather.wind.speed}m/s{" "}
                <i className={`wi wi-wind towards-${weather.wind.deg}-deg`}></i>{" "}
                {weather.wind.deg}deg.
                <br></br>
                Cloudiness: {weather.clouds.all}%
              </Typography>
              <Typography className={classes.footerItems} variant="body1">
                Humidity: {weather.main.humidity}%<br></br>
                Visibility: {weather.visibility}m
              </Typography>
            </div> */}
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
      </div>
    </div>
    // <pre>{JSON.stringify(displayState, null, 2)}</pre>
    // </React.Fragment>
  );
}
