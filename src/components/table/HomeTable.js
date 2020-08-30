import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const moment = require("moment"); // require Moment library

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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    // minHeight: 800,
  },
});

export default function CustomizedTables({ flights }) {
  const classes = useStyles();

  // Table Rows
  const tableFlights = flights.map((flight) => {
    return {
      id: flight.id,
      flightNo: flight.flightNo,
      acReg: flight.acReg,
      // dateTime: moment(flight.dateTime, true).format("DD/MM/YYYY HH:mm"), // Strict mode: ISO 8601 (Before conversion to readable format)
      date: moment(flight.dateTime, true).format("DD/MM/YYYY"),
      time: moment(flight.dateTime, true).format("HH:mm"),
      from: flight.from,
      to: flight.to,
      company: flight.company,
    };
  });

  return (
    <TableContainer component={Paper}>
      <Table
        className={classes.table}
        size="medium"
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Flight No.</StyledTableCell>
            <StyledTableCell align="right">Aircraft Reg.</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Time</StyledTableCell>
            <StyledTableCell align="right">From</StyledTableCell>
            <StyledTableCell align="right">To</StyledTableCell>
            <StyledTableCell align="right">Company</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableFlights.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.flightNo}
              </StyledTableCell>
              <StyledTableCell align="right">{row.acReg}</StyledTableCell>
              <StyledTableCell align="right">{row.date}</StyledTableCell>
              <StyledTableCell align="right">{row.time}</StyledTableCell>
              <StyledTableCell align="right">{row.from}</StyledTableCell>
              <StyledTableCell align="right">{row.to}</StyledTableCell>
              <StyledTableCell align="right">{row.company}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
