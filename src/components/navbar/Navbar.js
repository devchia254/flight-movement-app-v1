import React, { Component } from "react";
// import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import DrawerButton from "./Drawer";

const navStyle = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

class Navbar extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    console.log(this.props.children);
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <DrawerButton />
            <Typography variant="h6" className={classes.title}>
              {this.props.children}
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default withStyles(navStyle)(Navbar);
