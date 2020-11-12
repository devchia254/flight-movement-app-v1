import React, { Component } from "react";
import FlightsPage from "./FlightsPage";
import WeatherPage from "./WeatherPage";
// Carousel Components
import CarouselSlide from "./carousel/CarouselSlide";
import ImageSlide from "./carousel/ImageSlide";
import Arrow from "./carousel/Arrow";
// Images
import dg from "../../assets/homepage-img/dg.jpg";
import covid1 from "../../assets/homepage-img/covid1.jpg";
// Material UI
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";
import Hidden from "@material-ui/core/Hidden";

const homepageStyles = (theme) => ({
  carousel: {},
});

// Carousel Slides containing each component
const SLIDE_INFO = [
  { component: <FlightsPage /> },
  { component: <WeatherPage /> },
  { component: <ImageSlide file={dg} title="Dangerous Goods" /> },
  { component: <ImageSlide file={covid1} /> },
];

// Interval for the Slide Transition
const intervalLimit = 20000;

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      slideIn: true,
      slideDirection: "down",
      screenUsed: false,
    };

    this.setIndex = this.setIndex.bind(this);
    this.setSlideIn = this.setSlideIn.bind(this);
    this.setSlideDirection = this.setSlideDirection.bind(this);
    this.onArrowClick = this.onArrowClick.bind(this);
    this.userPresent = this.userPresent.bind(this);
    this.userNotPresent = this.userNotPresent.bind(this);
  }

  componentDidMount() {
    this.carouselTimer = setInterval(
      () => this.onArrowClick("right"),
      intervalLimit
    );
  }

  componentWillUnmount() {
    clearInterval(this.carouselTimer);
  }

  // Slide No.
  setIndex(newIndex) {
    this.setState({ index: newIndex });
  }

  // Slide appear/exit
  setSlideIn(bool) {
    this.setState({ slideIn: bool });
  }

  // Direction of Slide movement
  setSlideDirection(i) {
    this.setState({ slideDirection: i });
  }

  // Trigger transition
  onArrowClick(direction) {
    const numSlides = SLIDE_INFO.length;
    const increment = direction === "left" ? -1 : 1; // Increment slide based on direction
    const newIndex = (this.state.index + increment + numSlides) % numSlides; // Does not exceed numSlides - 1

    // console.log(
    //   ` (${this.state.index} + ${increment} + ${numSlides}) % ${numSlides} = ${newIndex}`
    // );

    // Handles the exit of the slide
    this.setSlideDirection(direction);
    this.setSlideIn(false);

    // Handles the appearance (entering the opposite direction from exit) of a new slide (based on 'newIndex')
    const oppDirection = direction === "left" ? "right" : "left";
    setTimeout(() => {
      this.setIndex(newIndex);
      this.setSlideDirection(oppDirection);
      this.setSlideIn(true);
    }, 500);
  }

  // Checks whether the user is interacting on the screen (Both Mouse & Touch)
  userPresent(e) {
    this.setState({ screenUsed: true });
    // If it's true then carousel timer is cleared
    clearInterval(this.carouselTimer);
  }

  // Checks whether the user is out of the screen (Both Mouse & Touch)
  userNotPresent(e) {
    this.setState({ screenUsed: false });
    // If it's false then carousel timer starts again
    this.carouselTimer = setInterval(
      () => this.onArrowClick("right"),
      intervalLimit
    );
  }

  render() {
    const { classes } = this.props;

    // Holds the component to mount based on the slide index
    const content = SLIDE_INFO[this.state.index];

    return (
      <Container maxWidth="xl">
        <Grid container spacing={2} className={classes.container}>
          <Grid
            onMouseOver={this.userPresent}
            onTouchStart={this.userPresent}
            onMouseOut={this.userNotPresent}
            onTouchEnd={this.userNotPresent}
            container
            item
            xs={12}
          >
            <Grid item sm={1}>
              {/* Hidden when BELOW 600px for Arrow - Start */}
              <Hidden xsDown>
                <Arrow
                  direction="left"
                  clickFunction={() => this.onArrowClick("left")}
                />
              </Hidden>
              {/* Hidden when BELOW 600px for Arrow - End */}
            </Grid>
            <Grid item sm={10} xs={12}>
              <Slide
                in={this.state.slideIn}
                direction={this.state.slideDirection}
                // timeout={{ appear: 5000 }}
              >
                <div className={classes.carousel}>
                  <CarouselSlide content={content} />
                </div>
              </Slide>
            </Grid>
            <Grid item sm={1}>
              {/* Hidden when BELOW 600px for Arrow - Start */}
              <Hidden xsDown>
                <Arrow
                  direction="right"
                  clickFunction={() => this.onArrowClick("right")}
                />
              </Hidden>
              {/* Hidden when BELOW 600px for Arrow - End */}
            </Grid>
            {/* Hidden when 600px & ABOVE for Arrow - Start */}
            <Hidden smUp>
              <Grid item xs={6}>
                <Arrow
                  direction="left"
                  clickFunction={() => this.onArrowClick("left")}
                />
              </Grid>
              <Grid item xs={6}>
                <Arrow
                  direction="right"
                  clickFunction={() => this.onArrowClick("right")}
                />
              </Grid>
            </Hidden>
            {/* Hidden when 600px & ABOVE for Arrow - End */}
          </Grid>
        </Grid>
        {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
      </Container>
    );
  }
}

export default withStyles(homepageStyles)(Homepage);
