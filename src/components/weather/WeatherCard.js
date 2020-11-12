import React from "react";
// Weather Icons
import "../../assets/icon/weather-icons.min.css";
import "../../assets/icon/weather-icons-wind.min.css";
// Images
import kkImage from "../../assets/img/mtKinabaluCrop.jpg";
import sdkImage from "../../assets/img/sdkCrop.jpg";
import kulImage from "../../assets/img/klCrop.jpg";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
// Other Dependencies
import moment from "moment"; // require Moment library

const useStyles = makeStyles((theme) => ({
  mainBg: {
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    // borderRadius: "inherit",
    borderRadius: "1em",

    width: "325px",
    minWidth: "300px", // width of card
    height: "80vh",
    maxHeight: "500px",
    boxShadow:
      "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
    color: "#ffffff",
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
    backgroundImage:
      "linear-gradient(315deg, rgba(114,237,242, 0.6),rgba(81,81,229, 1))",
    maxHeight: "inherit",

    padding: "2rem",
    borderRadius: "inherit", // inherits from mainBg
    height: "inherit", // inherits from mainBg
  },

  contentBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },

  headerBox: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
    marginBottom: theme.spacing(2),
  },

  weatherBox: {
    textAlign: "center",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(2),
  },

  icon: {
    fontSize: "6rem",
    margin: theme.spacing(3, 0),
  },

  footerBox: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
    height: "100%",
  },

  footerItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function WeatherCard(props) {
  const classes = useStyles();

  // Change background based on city clicked
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
              <Typography
                variant="h5"
                style={{ marginBottom: "0.5rem", textAlign: "center" }}
              >
                {moment().format("ddd D MMM YYYY")}
              </Typography>
              <Typography
                variant="h6"
                style={{ display: "flex", alignItems: "center" }}
              >
                <LocationOnIcon />
                {weather.name}
              </Typography>
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
                <img alt="Icon is here" width="100" height="100" />
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
  );
}
