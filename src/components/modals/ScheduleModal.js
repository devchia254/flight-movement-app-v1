import React from "react";
import ScheduleForm from "../forms/ScheduleForm";
// Material UI
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  dialogTitle: {
    padding: theme.spacing(2, 5, 0),
  },
  dialogContent: {},
  closeButton: {
    position: "absolute",
    right: theme.spacing(3),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

// Customised Dialog Title component
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
  const { createFlight, open, closeModal } = props;

  return (
    <Dialog
      open={open}
      onClose={closeModal}
      aria-labelledby="customized-dialog-title"
      aria-describedby="form-dialog-content"
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle id="customized-dialog-title" onClose={closeModal}>
        Schedule Flight
      </DialogTitle>
      <DialogContent id="form-dialog-content" className={classes.dialogContent}>
        <ScheduleForm createFlight={createFlight} />
      </DialogContent>
    </Dialog>
  );
});

export default ScheduleModal;
