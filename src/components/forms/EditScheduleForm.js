import React from "react";
// Formik
import { Formik, Form, Field } from "formik";
import MyField from "../formik-fields/MyField.js";
// Custom Formik components
import MyKBDateTimePicker from "../formik-fields/MyKBDateTimePicker.js";
import MySelectForStatuses from "../formik-fields/MySelectForStatuses.js";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// Other Dependencies
import * as yup from "yup"; // custom form validation
import moment from "moment"; // require Moment library

// Modal Styling
const useStyles = makeStyles((theme) => ({
  form: {
    "& > *": {
      margin: theme.spacing(1),
    },
    padding: theme.spacing(2),
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    margin: theme.spacing(2, 0, 1),
  },
}));

// Yup: String Validation
const yupStringRules = yup
  .string()
  .required("Required")
  .max(50, "Not more than 50 characters");

// Yup Configurations
const yupValidationSchema = yup.object().shape({
  flightNo: yupStringRules,
  company: yupStringRules,
  acReg: yupStringRules,
  destination: yupStringRules,
  checkIn: yup.date().nullable().required("Required"),
  etd: yup.date().nullable().required("Required"),
  eta: yup.date().nullable().required("Required"),
  status: yupStringRules,
});

function EditScheduleForm({ flightObj, editFlight, handleClose }) {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        flightNo: flightObj.flightNo,
        company: flightObj.company,
        acReg: flightObj.acReg,
        destination: flightObj.destination,
        checkIn: moment(flightObj.checkIn, "DD/MM/YYYY HH:mm", true).format(), // Converts "DD/MM/YYYY HH:mm" back to ISO 8601
        etd: moment(flightObj.etd, "DD/MM/YYYY HH:mm", true).format(), // Converts "DD/MM/YYYY HH:mm" back to ISO 8601
        eta: moment(flightObj.eta, "DD/MM/YYYY HH:mm", true).format(), // Converts "DD/MM/YYYY HH:mm" back to ISO 8601
        status: flightObj.status,
      }}
      validationSchema={yupValidationSchema}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        setSubmitting(true); // Makes async call and disables submit button

        editFlight(values, flightObj.flightId, resetForm); // Lift values to state

        setSubmitting(false); // Enables submit button once submitted

        handleClose(); // Closes Modal
      }}
    >
      {(props) => (
        <Form className={classes.form}>
          <MyField label="Flight No." name="flightNo" />
          <MyField label="Company" name="company" />
          <MyField label="Aircraft Reg." name="acReg" />
          <MyField label="Destination" name="destination" />
          <Field
            label="Check In (24hr)"
            name="checkIn"
            component={MyKBDateTimePicker}
          />
          <Field
            label="Estimated Time Departure (24hr)"
            name="etd"
            component={MyKBDateTimePicker}
          />
          <Field
            label="Estimated Time Arrival (24hr)"
            name="eta"
            component={MyKBDateTimePicker}
          />
          <MySelectForStatuses label="Status" name="status" />
          <Button
            disabled={props.isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.button}
          >
            submit
          </Button>
          {/* <pre>{JSON.stringify(props.values, null, 2)}</pre> */}
        </Form>
      )}
    </Formik>
  );
}

export default EditScheduleForm;
