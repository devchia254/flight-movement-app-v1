import React from "react";
import EditUserModal from "../modals/EditUserModal";
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

const moment = require("moment"); // require Moment library

function UsersTable(props) {
  const { users, deleteUser, editUser } = props;

  // Styling
  const myHeaders = {
    backgroundColor: "#3f51b5",
    color: "#ffffff",
    fontWeight: 600,
  };

  // Table Rows
  const tableUsers = users.map((user, i) => {
    return {
      no: i + 1,
      userId: user.userId, // Necessary for editing & deleting
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      createdAt: moment(user.createdAt, true).format("DD/MM/YYYY HH:mm"),
      updatedAt: moment(user.updatedAt, true).format("DD/MM/YYYY HH:mm"),
    };
  });

  // Table columns
  const columns = [
    // { title: "ID", field: "id" },
    { title: "No.", field: "no" },
    { title: "Email", field: "email" },
    { title: "First Name", field: "firstName" },
    {
      title: "Last Name",
      field: "lastName",
    },
    {
      title: "Role",
      field: "role",
    },
    {
      title: "Created at",
      field: "createdAt",
    },
    {
      title: "Updated at",
      field: "updatedAt",
      // defaultSort: "desc",
    },
  ];

  // React Hook: Open/Close Dialog
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleClickOpen = () => setOpen(true);

  // React Hook: Store rowData from onClick prop
  const [rowDetails, setRowDetails] = React.useState();
  const userObj = { ...rowDetails }; // Stores the rowData into a new object

  return (
    <React.Fragment>
      <MaterialTable
        icons={tableIcons}
        title="Record of Users"
        columns={columns}
        data={tableUsers}
        actions={[
          {
            icon: () => <EditIcon />,
            tooltip: "Edit User",
            onClick: (evt, rowData) => {
              setRowDetails(rowData);
              handleClickOpen();
            },
          },
          {
            icon: () => <DeleteOutline />,
            tooltip: "Delete User",
            onClick: (evt, rowData) => {
              deleteUser(rowData.userId);
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
      <EditUserModal
        userObj={userObj}
        editUser={editUser}
        handleClose={handleClose}
        open={open}
      />
    </React.Fragment>
  );
}
export default UsersTable;
