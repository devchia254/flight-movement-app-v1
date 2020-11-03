import React from "react";
import "../../assets/icon/weather-icons.min.css";
import "../../assets/icon/weather-icons-wind.min.css";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainBg: {
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    // borderRadius: "inherit",
    borderRadius: "0 1em 1em 0",

    width: "30vw", // width of card
    height: "75vh", // height of card
    maxHeight: "80vh",
    backgroundColor: "#343d4b",
    color: "#ffffff",
    padding: theme.spacing(2, 4),
  },

  contentBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "70%", // cumulates with locationBox
    // margin: theme.spacing(0, 2),

    // background: "papayawhip",
    // border: "2px solid darkcyan",
  },

  contentItem: {
    margin: theme.spacing(1.5, 0),
    width: "100%",
    display: "flex",
    justifyContent: "space-between",

    // background: "seagreen",
    // border: "1px solid black",
  },

  weatherHeader: {
    fontWeight: 700,
  },

  locationBox: {
    // height: "100%", // This extends over the parent div. Review later
    // width: "100%",
    // margin: theme.spacing(0, 2),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    height: "30%", // cumulates with contentBox

    // background: "antiquewhite",
    // border: "1px solid black",
  },

  locationBtn: {
    borderRadius: theme.spacing(3),
    padding: theme.spacing(0.5),
    fontWeight: 600,
    margin: theme.spacing(0.5, 2),
    color: "#ffffff",

    backgroundImage:
      "linear-gradient(315deg, rgba(114,237,242, 1),rgba(81,81,229, 1))",
  },
}));

export default function WeatherInfo(props) {
  const classes = useStyles();

  const { getCityId, cityId, weather } = props;

  return (
    // <React.Fragment>
    <div className={classes.mainBg}>
      {typeof weather.main != "undefined" ? (
        <div className={classes.contentBox}>
          <div className={classes.contentItem}>
            <Typography variant="body1" className={classes.weatherHeader}>
              TEMP. (MIN-MAX)
            </Typography>
            <Typography variant="body1">
              {weather.main.temp_min.toFixed(1)} -{" "}
              {weather.main.temp_max.toFixed(1)}°C
            </Typography>
          </div>
          <div className={classes.contentItem}>
            <Typography variant="body1" className={classes.weatherHeader}>
              WIND DIRECTION
            </Typography>
            <Typography variant="body1">{weather.wind.deg}°</Typography>
          </div>
          <div className={classes.contentItem}>
            <Typography variant="body1" className={classes.weatherHeader}>
              CLOUDINESS
            </Typography>
            <Typography variant="body1">{weather.clouds.all}%</Typography>
          </div>
          <div className={classes.contentItem}>
            <Typography variant="body1" className={classes.weatherHeader}>
              RAIN (1HR)
            </Typography>
            <Typography variant="body1">
              {weather.rain ? weather.rain["1h"] : "-"} mm
            </Typography>
          </div>
          <div className={classes.contentItem}>
            <Typography variant="body1" className={classes.weatherHeader}>
              HUMIDITY
            </Typography>
            <Typography variant="body1">{weather.main.humidity}%</Typography>
          </div>
          <div className={classes.contentItem}>
            <Typography variant="body1" className={classes.weatherHeader}>
              PRESSURE
            </Typography>
            <Typography variant="body1">{weather.main.pressure} hPa</Typography>
          </div>
        </div>
      ) : (
        // Show something if fetching fails
        <div className={classes.contentBox}></div>
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
    // <pre>{JSON.stringify(displayState, null, 2)}</pre>
    // </React.Fragment>
  );
}
