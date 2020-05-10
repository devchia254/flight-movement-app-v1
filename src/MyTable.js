import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

function MyTable({ flights }) {
  // const { flights } = props;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Flight No.</TableCell>
            <TableCell>Aircraft Reg.</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flights.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.flightNo}</TableCell>
              <TableCell>{row.acReg}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.from}</TableCell>
              <TableCell>{row.to}</TableCell>
              <TableCell>{row.company}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default MyTable;
