import React from "react";
// import EditForm from "../forms/EditForm";
import ScheduleForm from "../forms/ScheduleForm";

// Material Dialog
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  dialogTitle: {
    // margin: theme.spacing(1),
    padding: theme.spacing(2, 5, 0),
  },
  dialogContent: {
    // paddingTop: theme.spacing(1),
    // backgroundColor: "green",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(3),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle
      disableTypography
      className={classes.dialogTitle}
      {...other}
    >
      <Typography variant="h5">{children}</Typography>
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

const ScheduleModal = withStyles(styles)((props) => {
  const { classes } = props;
  const { addFlight, open, handleClose } = props;

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
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Schedule Flight
      </DialogTitle>
      <DialogContent id="form-dialog-content" className={classes.dialogContent}>
        <ScheduleForm addFlight={addFlight} handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
});

export default ScheduleModal;
