import React, { Component } from "react";

import HomepageTable from "../components/table/HomepageTable";
import WeatherPage from "../components/weather/WeatherPage";
import CarouselSlide from "../components/carousel/CarouselSlide";
import Arrow from "../components/carousel/Arrow";

import { Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";

const homepageStyles = (theme) => ({
  container: {
    // marginTop: theme.spacing(3),
  },
  homepageLeft: {
    padding: theme.spacing(1),
    // Height: "800px",
    // display: "grid",
    // gridTemplateRows: "1fr 2fr",
  },
  dateNav: {
    // height: "200px",
    display: "flex",
    justifyContent: "space-between",
    margin: "2em 0 2em",
    // flexDirection: "column",
  },
  flightsTable: {
    height: "100%",
    // alignItems: "",
    // marginBottom: theme.spacing(2),
  },
  carouselBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  carousel: {
    width: "100%",
  },
});

const SLIDE_INFO = [
  { backgroundColor: "#ff7c7c", component: <HomepageTable /> },
  { backgroundColor: "#ffb6b9", component: <WeatherPage /> },
  { backgroundColor: "#8deaff", component: "Slide 3" },
  { backgroundColor: "#ffe084", component: "Slide 4" },
  { backgroundColor: "#d9d9d9", component: "Slide 5" },
];

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      slideIn: true,
      slideDirection: "down",
    };
  }

  componentDidMount() {
    // this.carouselTimer = setInterval(() => this.onArrowClick("right"), 10000);
  }

  componentWillUnmount() {
    // clearInterval(this.carouselTimer);
  }

  // Slide No.
  setIndex = (newIndex) => {
    this.setState({ index: newIndex });
  };

  // Slide appear/exit
  setSlideIn = (bool) => {
    this.setState({ slideIn: bool });
  };

  // Direction of Slide movement
  setSlideDirection = (i) => {
    this.setState({ slideDirection: i });
  };

  onArrowClick = (direction) => {
    const numSlides = SLIDE_INFO.length;

    const increment = direction === "left" ? -1 : 1;
    const newIndex = (this.state.index + increment + numSlides) % numSlides; // Does not exceed numSlides - 1

    // console.log(
    //   ` (${this.state.index} + ${increment} + ${numSlides}) % ${numSlides} = ${newIndex}`
    // );

    // Handles the exit of the slide
    this.setSlideDirection(direction);
    this.setSlideIn(false);

    // Handles the appearance (the opposite direction from exit) of a new slide (newIndex)
    const oppDirection = direction === "left" ? "right" : "left";
    setTimeout(() => {
      this.setIndex(newIndex);
      this.setSlideDirection(oppDirection);
      this.setSlideIn(true);
    }, 500);
  };

  render() {
    const { classes } = this.props;

    const content = SLIDE_INFO[this.state.index];

    return (
      <Container maxWidth="lg">
        <Grid container spacing={2} className={classes.container}>
          {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
          <Grid item xs={12}>
            <div className={classes.carouselBox}>
              <Arrow
                direction="left"
                clickFunction={() => this.onArrowClick("left")}
              />
              <Slide
                in={this.state.slideIn}
                direction={this.state.slideDirection}
                // timeout={{ appear: 5000 }}
                mountOnEnter
                // unmountOnExit
              >
                <div className={classes.carousel}>
                  <CarouselSlide content={content} />
                </div>
              </Slide>
              <Arrow
                direction="right"
                clickFunction={() => this.onArrowClick("right")}
              />
            </div>
          </Grid>
          {/* Below testing slide purposes*/}
          {/* <Grid
            item
            xs={12}
            sm={12}
            style={{ background: "lightGreen" }}
          ></Grid> */}
        </Grid>
      </Container>
    );
  }
}

export default withStyles(homepageStyles)(Homepage);
