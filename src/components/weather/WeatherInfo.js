import React from "react";
import "../../assets/icon/weather-icons.min.css";
import "../../assets/icon/weather-icons-wind.min.css";
import kkImage from "../../assets/img/mtKinabaluCrop.jpg";
import sdkImage from "../../assets/img/sdkCrop.jpg";
import kulImage from "../../assets/img/klCrop.jpg";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const useStyles = makeStyles((theme) => ({
  mainBg: {
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    // borderRadius: "inherit",
    borderRadius: "0 1em 1em 0",

    width: "30vw", // width of card
    height: "75vh",
    maxHeight: "80vh",
    backgroundColor: "#343d4b",
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
      "linear-gradient(340deg, rgba(114,237,242, 0.4),rgba(81,81,229, 0.9))",
    // "linear-gradient(to bottom, rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.75))",

    padding: "25px",
    borderRadius: "inherit", // inherits from mainBg
    height: "inherit", // inherits from mainBg
  },

  contentBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  locationBox: {
    // height: "100%", // This extends over the parent div. Review later
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

export default function WeatherInfo(props) {
  const classes = useStyles();

  const { getCityId, cityId, weather } = props;

  return (
    // <React.Fragment>
    <div className={classes.mainBg}>
      {typeof weather.main != "undefined" ? (
        <div className={classes.contentBox}>Hello</div>
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
