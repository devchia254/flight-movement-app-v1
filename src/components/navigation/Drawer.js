import React from "react";
// React Router
import { Link as RouterLink } from "react-router-dom";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// Material UI Icons
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ScheduleIcon from "@material-ui/icons/Schedule";
import RegisterIcon from "@material-ui/icons/PersonAdd";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LogOutIcon from "@material-ui/icons/PowerSettingsNew";
import AccessibilityIcon from "@material-ui/icons/Accessibility";

const useStyles = makeStyles((theme) => ({
  listIcon: {
    minWidth: 0,
    marginRight: theme.spacing(2),
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawerFlex: {
    display: "flex",
    height: "100vh",
    maxHeight: "100vh",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

// Custom RouterLink item - without prop forwarding
function ListItemLink(props) {
  const classes = useStyles();
  const { icon, primary, to, name, logoutFromState } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem
        button
        className={classes.listItem}
        component={renderLink}
        name={name}
        onClick={logoutFromState}
      >
        {icon ? (
          <ListItemIcon className={classes.listIcon}>{icon}</ListItemIcon>
        ) : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

export default function DrawerButton(props) {
  const { showRegister, currentUser, logoutFromState } = props;
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, left: open });
  };

  // Drawer List Items
  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className={classes.drawerFlex}>
        <div className={classes.topSection}>
          <ListItemLink
            to="/"
            primary="Home"
            name="home"
            icon={<HomeRoundedIcon color="primary" />}
          />

          {/* if there is a user, Admin and Standard can view schedule page */}
          {currentUser && (
            <ListItemLink
              to="/schedule"
              primary="Schedule"
              name="schedule"
              icon={<ScheduleIcon color="primary" />}
            />
          )}

          {/* if there is no user logged in, login page can be viewed */}
          {!currentUser && (
            <ListItemLink
              to="/login"
              primary="Login"
              name="login"
              icon={<AccountCircleIcon color="primary" />}
            />
          )}

          {/* if there is no user logged in, register page can be viewed */}
          {!currentUser && (
            <ListItemLink
              to="/register"
              primary="Register"
              name="register"
              icon={<RegisterIcon color="primary" />}
            />
          )}

          {/* Only Admin can view */}
          {showRegister && (
            <ListItemLink
              to="/manage-user"
              primary="Manage User"
              name="manageUser"
              icon={<AccessibilityIcon color="primary" />}
            />
          )}
        </div>
        <div className={classes.bottomSection}>
          {/* If there is a user, show log out button */}
          {currentUser && (
            <ListItemLink
              // Redirect after logout
              to="/"
              primary="Log Out"
              name="logout"
              icon={<LogOutIcon color="primary" />}
              logoutFromState={logoutFromState}
            />
          )}
        </div>
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <IconButton
          onClick={toggleDrawer("left", true)}
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
