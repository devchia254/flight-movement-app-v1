import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
// import UserIcon from "@material-ui/icons/AccountCircleOutlined";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
// import CreateIcon from "@material-ui/icons/Create";
import ScheduleIcon from "@material-ui/icons/Schedule";
import RegisterIcon from "@material-ui/icons/PersonAdd";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LogOutIcon from "@material-ui/icons/PowerSettingsNew";
// import Divider from "@material-ui/core/Divider";

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
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

// Custom RouterLink item - without prop forwarding
function ListItemLink(props) {
  const classes = useStyles();
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button className={classes.listItem} component={renderLink}>
        {icon ? (
          <ListItemIcon className={classes.listIcon}>{icon}</ListItemIcon>
        ) : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

export default function DrawerButton(props) {
  const { showRegister, currentUser } = props;
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
            icon={<HomeRoundedIcon color="primary" />}
          />

          {/* if there is a user, Admin and Standard can viee schedule page */}
          {currentUser && (
            <ListItemLink
              to="/schedule"
              primary="Schedule"
              icon={<ScheduleIcon color="primary" />}
            />
          )}

          {/* if there is no user, Admin and Standard can view login page */}
          {!currentUser && (
            <ListItemLink
              to="/login"
              primary="Login"
              icon={<AccountCircleIcon color="primary" />}
            />
          )}

          {/* Only Admin can view */}
          {showRegister && (
            <ListItemLink
              to="/register"
              primary="Register"
              icon={<RegisterIcon color="primary" />}
            />
          )}
        </div>
        <div className={classes.bottomSection}>
          {currentUser && (
            <ListItemLink
              // to="/register"
              primary="Log Out"
              icon={<LogOutIcon color="primary" />}
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
