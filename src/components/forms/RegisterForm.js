import React from "react";
// Formik
import { Formik, Form } from "formik";
// Custom Formik components
import MyField from "../formik-fields/MyField.js";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// Other dependencies
import * as yup from "yup"; // custom form validation

// Yup: Email Validation
const yupEmailRules = yup
  .string()
  .required("Required")
  .email("Must be a valid email");

// Yup: Password Validation
const yupPwdRules = yup
  .string()
  .required("Required")
  .min(8, "Must not be less than 8 characters");

// Yup: Password Verification
const yupPwdVerify = yup
  .string()
  .oneOf([yup.ref("password"), null], "Passwords must match");

// Yup: String Validation
const yupStringRules = yup
  .string()
  .required("Required")
  .max(50, "Not more than 50 characters");

// Yup Configurations
const yupValidationSchema = yup.object().shape({
  firstName: yupStringRules,
  lastName: yupStringRules,
  email: yupEmailRules,
  password: yupPwdRules,
  passwordVerify: yupPwdVerify,
});

const useStyles = makeStyles((theme) => ({
  form: {
    "& > *": {
      margin: theme.spacing(1),
    },
    padding: theme.spacing(2, 2, 1),
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    margin: theme.spacing(2, 0, 1),
  },
}));

function RegisterForm(props) {
  const { registerUser } = props;
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordVerify: "",
      }}
      validationSchema={yupValidationSchema}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        setSubmitting(true); // Makes async call and disables submit button

        registerUser(values, resetForm); // Lift values to state

        setSubmitting(false); // Enables submit button once submitted
      }}
    >
      {(props) => (
        <Form className={classes.form}>
          <MyField label="First Name" name="firstName" />
          <MyField label="Last Name" name="lastName" />
          <MyField label="Email" name="email" />
          <MyField label="Password" name="password" type="password" />
          <MyField
            label="Verify Password"
            name="passwordVerify"
            type="password"
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
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
