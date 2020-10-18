import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Avatar, Typography } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 600,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: "300px",
    // minWidth: 500,
    // minHeight: 800,
  },
  noFltBox: {
    // minWidth: "500px",
    width: "100%",
    height: "80%",
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
    // alignItems: "center",
  },
  msgBox: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70px",
    width: "auto",
    marginTop: theme.spacing(4),
  },
  avatar: {
    backgroundColor: "inherit",
    margin: theme.spacing(1),
    border: "3px solid white",
  },
  icon: {
    // backgroundColor: "inherit",
    // color: "green",
  },
}));

export default function CustomizedTables({ tableFlights }) {
  const sortFlights = tableFlights.sort((a, b) => {
    return a.checkIn.localeCompare(b.checkIn);
  });

  const classes = useStyles();

  return !tableFlights.length ? (
    <div className={classes.noFltBox}>
      <Paper elevation={5} className={classes.msgBox}>
        <Avatar className={classes.avatar}>
          <ClearIcon className={classes.icon} />
        </Avatar>
        <Typography variant="h6" style={{ color: "white" }}>
          No Scheduled Flights
        </Typography>
      </Paper>
    </div>
  ) : (
    <TableContainer component={Paper} className={classes.table}>
      <Table size="medium" aria-label="customized table">
        <TableHead>
          <TableRow>
            {/* <StyledTableCell>Flight No.</StyledTableCell> */}
            <StyledTableCell>Company</StyledTableCell>
            <StyledTableCell align="right">Aircraft</StyledTableCell>
            <StyledTableCell align="right">Destination</StyledTableCell>
            {/* <StyledTableCell align="right">Date</StyledTableCell> */}
            <StyledTableCell align="right">Check In</StyledTableCell>
            <StyledTableCell align="right">ETD</StyledTableCell>
            <StyledTableCell align="right">ETA</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortFlights.map((row) => (
            <StyledTableRow key={row.flightId}>
              {/* <StyledTableCell component="th" scope="row">
                {row.flightNo}
              </StyledTableCell> */}
              <StyledTableCell component="th" scope="row">
                {row.company}
              </StyledTableCell>
              <StyledTableCell align="right">{row.acReg}</StyledTableCell>
              <StyledTableCell align="right">{row.destination}</StyledTableCell>
              <StyledTableCell align="right">{row.checkIn}</StyledTableCell>
              <StyledTableCell align="right">{row.etd}</StyledTableCell>
              <StyledTableCell align="right">{row.eta}</StyledTableCell>
              <StyledTableCell align="right">{row.status}</StyledTableCell>
              <StyledTableCell align="right">{row.flightDate}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
