import React from "react";
import EditForm from "../forms/EditForm";

// Material Dialog
import { withStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

// const useStyles = makeStyles({
//   root: {
//     // backgroundColor: blue[50],
//     // color: blue[600],
//   },
// });
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const EditModal = (props) => {
  // const classes = useStyles();
  const { open, handleClose, flightObj, editFlight } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      aria-describedby="form-dialog-content"
      fullWidth={true}
      maxWidth="xs"
      // className={classes.root}
    >
      {/* <DialogTitle id="form-dialog-title"></DialogTitle> */}
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Edit Flights Details
      </DialogTitle>
      <DialogContent id="form-dialog-content">
        {/* <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText> */}
        <EditForm
          flightObj={flightObj}
          editFlight={editFlight}
          handleClose={handleClose}
        />
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default EditModal;
