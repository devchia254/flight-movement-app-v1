import React from "react";
// Formik
import { Formik, Form, Field } from "formik";
// Custom Formik components
import MyField from "../../../components/formik-fields/MyField.js";
import MyKBDateTimePicker from "../../../components/formik-fields/MyKBDateTimePicker.js";
import MySelectForStatuses from "../../../components/formik-fields/MySelectForStatuses.js";
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

// Yup: Date Validation
const yupDateRules = yup.date().nullable().required("Required");

// Yup Configurations
const yupValidationSchema = yup.object().shape({
  flightNo: yupStringRules,
  company: yupStringRules,
  acReg: yupStringRules,
  destination: yupStringRules,
  checkIn: yupDateRules,
  etd: yupDateRules,
  eta: yupDateRules,
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

export default ScheduleForm;
