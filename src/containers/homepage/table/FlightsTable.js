import React from "react";
// Material UI
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ClearIcon from "@material-ui/icons/Clear";
import CircularProgress from "@material-ui/core/CircularProgress";

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

// Varied, coloured table rows
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    minWidth: "300px",
    maxHeight: "50vh", // This enables table scroll & 'stickyHeader' is ref at Table
  },
  noFltBox: {
    width: "100%",
    height: "80%",
    maxHeight: "70vh",
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
  loadingBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  msgBox: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70px",
    width: "auto",
    margin: theme.spacing(4, 0),
  },
  avatar: {
    backgroundColor: "inherit",
    margin: theme.spacing(1),
    border: "3px solid white",
  },
  icon: {},
}));

export default function CustomizedTables({ tableFlights, isLoading }) {
  // Sorts flights based on the 'Check In' column starting from the earliest
  const sortFlights = tableFlights.sort((a, b) => {
    return a.checkIn.localeCompare(b.checkIn);
  });

  const classes = useStyles();

  return isLoading ? (
    <div className={classes.noFltBox}>
      <div className={classes.loadingBox}>
        <CircularProgress style={{ marginBottom: "1em" }} />
        <Typography variant="h6">Loading Flights</Typography>
      </div>
    </div>
  ) : !tableFlights.length ? (
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
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table stickyHeader size="medium" aria-label="customized table">
        <TableHead>
          <TableRow>
            {/* <StyledTableCell>Flight No.</StyledTableCell> */}
            <StyledTableCell>
              <Typography variant="h6">Company</Typography>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Typography variant="h6">Aircraft</Typography>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Typography variant="h6">Destination</Typography>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Typography variant="h6">Check In</Typography>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Typography variant="h6">ETD</Typography>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Typography variant="h6">ETA</Typography>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Typography variant="h6">Status</Typography>
            </StyledTableCell>
            {/* <StyledTableCell align="right">Date</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortFlights.map((row) => (
            <StyledTableRow key={row.flightId}>
              {/* <StyledTableCell component="th" scope="row">
                {row.flightNo}
              </StyledTableCell> */}
              <StyledTableCell component="th" scope="row">
                <Typography variant="body1">{row.company}</Typography>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Typography variant="body1">{row.acReg}</Typography>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Typography variant="body1">{row.destination}</Typography>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Typography variant="body1">{row.checkIn}</Typography>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Typography variant="body1">{row.etd}</Typography>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Typography variant="body1">{row.eta}</Typography>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Typography variant="body1">{row.status}</Typography>
              </StyledTableCell>
              {/* <StyledTableCell align="right">{row.flightDate}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
