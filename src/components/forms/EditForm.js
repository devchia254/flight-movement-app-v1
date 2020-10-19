import React from "react";
import { Button } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import MyField from "../formik-fields/MyField.js";
import MyKBDateTimePicker from "../formik-fields/MyKBDateTimePicker.js";
import MySelect from "../formik-fields/MySelect.js";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { DisplayFormikProps } from "../../test/DisplayFormikProps.js";
const moment = require("moment"); // require Moment library

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

const yupStringRules = yup
  .string()
  .required("Required")
  .max(20, "Must be 20 characters or less");

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

function EditForm({ flightObj, editFlight, handleClose }) {
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
          {/* <MyField label="Status" name="status" /> */}
          <MySelect
            label="Status"
            name="status"
            // value={props.initialValues.status}
          />
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
          <div>
            <DisplayFormikProps {...props} />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default EditForm;
