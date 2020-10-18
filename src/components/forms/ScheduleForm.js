import React from "react";
import { Button } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import MyField from "../formik-fields/MyField.js";
import MyKBDateTimePicker from "../formik-fields/MyKBDateTimePicker.js";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
// import { DisplayFormikProps } from "../../test/DisplayFormikProps.js";\

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

function ScheduleForm({ createFlight }) {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        flightNo: "",
        company: "",
        acReg: "",
        destination: "",
        checkIn: moment().format(), // Converts date to ISO 8601 for POST data
        etd: moment().format(),
        eta: moment().format(),
        status: "",
      }}
      validationSchema={yupValidationSchema}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        setSubmitting(true); // Makes async call and disables submit button

        createFlight(values); // add flight values by lifting to state

        // Clear form after submit
        resetForm({
          values: {
            flightNo: "",
            company: "",
            acReg: "",
            destination: "",
            checkIn: null,
            etd: null,
            eta: null,
            status: "",
          },
        });

        setSubmitting(false); // Enables submit button once submitted
        // // setTimeout to mimic fetch POST data
        // setTimeout(() => {}, 1500); // 3 secs timeout
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
          <MyField label="Status" name="status" />
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
          {/* <DisplayFormikProps {...props} /> */}
        </Form>
      )}
    </Formik>
  );
}

export default ScheduleForm;
