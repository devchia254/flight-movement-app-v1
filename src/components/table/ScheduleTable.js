import React from "react";
import EditScheduleModal from "../modals/EditScheduleModal";
// Material Table
import MaterialTable from "material-table"; // MTableToolbar
// Material UI Icons
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
// Material UI - Action Column Icons
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
// Other Dependencies
import moment from "moment"; // require Moment library

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  // Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

function ScheduleTable(props) {
  const { flights, deleteFlight, editFlight } = props;

  // Styling
  const myHeaders = {
    backgroundColor: "#3f51b5",
    color: "#ffffff",
    fontWeight: 600,
  };

  // Table Rows
  const tableFlights = flights.map((flight) => {
    return {
      flightId: flight.flightId, // Necessary for editing & deleting
      flightNo: flight.flightNo,
      company: flight.company,
      acReg: flight.acReg,
      destination: flight.destination,
      checkIn: moment(flight.checkIn, true).format("DD/MM/YYYY HH:mm"), // Strict mode: ISO 8601 (Before conversion to readable format)
      etd: moment(flight.etd, true).format("DD/MM/YYYY HH:mm"),
      eta: moment(flight.eta, true).format("DD/MM/YYYY HH:mm"),
      status: flight.status,
      updatedAt: moment(flight.updatedAt, true).format("DD/MM/YYYY HH:mm"),
    };
  });

  // Table columns
  const columns = [
    // { title: "ID", field: "id" },
    { title: "Flight No.", field: "flightNo" },
    { title: "Company", field: "company" },
    { title: "Aircraft Reg.", field: "acReg" },
    {
      title: "Destination",
      field: "destination",
    },
    {
      title: "Check In",
      field: "checkIn",
    },
    {
      title: "ETD",
      field: "etd",
    },
    {
      title: "ETA",
      field: "eta",
    },
    { title: "Status", field: "status" },
    {
      title: "Last Modified",
      field: "updatedAt",
      defaultSort: "desc",
    },
  ];

  // React Hook: Open/Close Dialog
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleClickOpen = () => setOpen(true);

  // React Hook: Store rowData from onClick prop
  const [rowDetails, setRowDetails] = React.useState();
  const flightObj = { ...rowDetails }; // Stores the rowData into a new object

  return (
    <React.Fragment>
      <MaterialTable
        icons={tableIcons}
        title="Record of Flights"
        columns={columns}
        data={tableFlights}
        actions={[
          {
            icon: () => <EditIcon />,
            tooltip: "Edit Flight",
            onClick: (evt, rowData) => {
              setRowDetails(rowData);
              handleClickOpen();
            },
          },
          {
            icon: () => <DeleteOutline />,
            tooltip: "Delete Flight",
            onClick: (evt, rowData) => {
              deleteFlight(rowData.flightId);
            },
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          sorting: true,
          filtering: false,
          headerStyle: myHeaders,
        }}
      />
      <EditScheduleModal
        flightObj={flightObj}
        editFlight={editFlight}
        handleClose={handleClose}
        open={open}
      />
    </React.Fragment>
  );
}
export default ScheduleTable;
