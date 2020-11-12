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

// Yup: Password Validation
const yupPwdRules = yup.string().required("Required");

// Yup: Email Validation
const yupEmailRules = yup
  .string()
  .required("Required")
  .email("Must be a valid email");

// Yup Configurations
const yupValidationSchema = yup.object().shape({
  email: yupEmailRules,
  password: yupPwdRules,
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

function LoginForm(props) {
  const classes = useStyles();
  const { loginUser } = props;

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={yupValidationSchema}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        setSubmitting(true); // Makes async call and disables submit button
        loginUser(values); // Lift values to state
        setSubmitting(false); // Enables submit button once submitted
      }}
    >
      {(props) => (
        <Form className={classes.form}>
          <MyField label="Email" name="email" />
          <MyField label="Password" name="password" type="password" />
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

export default LoginForm;
