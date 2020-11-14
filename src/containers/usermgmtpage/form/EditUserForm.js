import React from "react";
// Formik
import { Formik, Form } from "formik";
// Custom Formik components
import MyField from "../../../components/formik-fields/MyField.js";
import MySelectForRoles from "../../../components/formik-fields/MySelectForRoles.js";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// Other dependencies
import * as yup from "yup"; // custom form validation

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

        editUser(values, userObj.userId, resetForm); // Lift values to state

        setSubmitting(false); // Enables submit button once submitted

        handleClose(); // Closes Modal
      }}
    >
      {(props) => (
        <Form className={classes.form}>
          <MyField label="Email" name="email" />
          <MyField label="First Name" name="firstName" />
          <MyField label="Last Name" name="lastName" />
          <MySelectForRoles label="Role" name="role" />
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

export default EditUserForm;
