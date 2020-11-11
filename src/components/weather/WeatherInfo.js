import React from "react";
// Weather Icons
import "../../assets/icon/weather-icons.min.css";
import "../../assets/icon/weather-icons-wind.min.css";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  mainBg: {
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    [theme.breakpoints.up("md")]: {
      borderRadius: "0 1em 1em 0",
    },
    [theme.breakpoints.down("sm")]: {
      borderRadius: "1em",
    },
    width: "350px",
    minWidth: "300px",
    height: "75vh", // height of card
    maxHeight: "450px",
    backgroundColor: "#343d4b",
    boxShadow:
      "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
    color: "#ffffff",
    padding: theme.spacing(2, 4),
  },

  contentBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "70%", // cumulates with locationBox
  },

  contentItem: {
    margin: theme.spacing(1.5, 0),
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },

  weatherHeader: {
    fontWeight: 700,
  },

  weatherValue: {
    textAlign: "end",
  },

  locationBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    height: "30%", // cumulates with contentBox
  },

  locationBtn: {
    borderRadius: theme.spacing(3),
    padding: theme.spacing(0.5),
    fontWeight: 600,
    margin: theme.spacing(0.5, 1.5),
    color: "#ffffff",
    backgroundImage:
      "linear-gradient(315deg, rgba(114,237,242, 1),rgba(81,81,229, 1))",
  },
}));

export default function WeatherInfo(props) {
  const classes = useStyles();

  const { getCityId, cityId, weather } = props;

  return (
    <div className={classes.mainBg}>
      {typeof weather.main != "undefined" ? (
        <div className={classes.contentBox}>
          <div className={classes.contentItem}>
            <Typography variant="body1" className={classes.weatherHeader}>
              TEMP. (MIN-MAX)
            </Typography>
            <Typography variant="body1" className={classes.weatherValue}>
              {weather.main.temp_min.toFixed(1)} -{" "}
              {weather.main.temp_max.toFixed(1)}°C
            </Typography>
          </div>
          <div className={classes.contentItem}>
            <Typography variant="body1" className={classes.weatherHeader}>
              WIND DIRECTION
            </Typography>
            <Typography variant="body1" className={classes.weatherValue}>
              {weather.wind.deg}°
            </Typography>
          </div>
          <div className={classes.contentItem}>
            <Typography variant="body1" className={classes.weatherHeader}>
              CLOUDINESS
            </Typography>
            <Typography variant="body1" className={classes.weatherValue}>
              {weather.clouds.all}%
            </Typography>
          </div>
          <div className={classes.contentItem}>
            <Typography variant="body1" className={classes.weatherHeader}>
              RAIN (1HR)
            </Typography>
            <Typography variant="body1" className={classes.weatherValue}>
              {weather.rain ? weather.rain["1h"] : "-"} mm
            </Typography>
          </div>
          <div className={classes.contentItem}>
            <Typography variant="body1" className={classes.weatherHeader}>
              HUMIDITY
            </Typography>
            <Typography variant="body1" className={classes.weatherValue}>
              {weather.main.humidity}%
            </Typography>
          </div>
          <div className={classes.contentItem}>
            <Typography variant="body1" className={classes.weatherHeader}>
              PRESSURE
            </Typography>
            <Typography variant="body1" className={classes.weatherValue}>
              {weather.main.pressure} hPa
            </Typography>
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
  );
}
