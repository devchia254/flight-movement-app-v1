import React from "react";
import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import MyField from "../formik-fields/MyField.js";
import MySelectForRoles from "../formik-fields/MySelectForRoles.js";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
// import { DisplayFormikProps } from "../../test/DisplayFormikProps.js";

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
  email: yup.string().email().required(),
  firstName: yupStringRules,
  lastName: yupStringRules,
  role: yupStringRules,
});

function EditUserForm({ userObj, editUser, handleClose }) {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        email: userObj.email,
        firstName: userObj.firstName,
        lastName: userObj.lastName,
        role: userObj.role,
      }}
      validationSchema={yupValidationSchema}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        setSubmitting(true); // Makes async call and disables submit button

        editUser(values, userObj.userId);
        // editFlight(values, userObj.flightId, resetForm); // Lift values to state

        setSubmitting(false); // Enables submit button once submitted

        handleClose(); // Closes Modal
      }}
    >
      {(props) => (
        <Form className={classes.form}>
          <MyField label="Email" name="email" />
          <MyField label="First Name" name="firstName" />
          <MyField label="Last Name" name="lastName" />
          <MySelectForRoles
            label="Role"
            name="role"
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
          {/* <DisplayFormikProps {...props} /> */}
        </Form>
      )}
    </Formik>
  );
}

export default EditUserForm;
