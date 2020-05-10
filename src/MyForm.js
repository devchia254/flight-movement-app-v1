import React from "react";
import { Button } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import MyField from "./MyField.js";

function MyForm({ onSubmit }) {
  return (
    <Formik
      initialValues={{
        flightNo: "",
        acReg: "",
        date: "",
        time: "",
        from: "",
        to: "",
        company: "",
      }}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({ values }) => (
        <Form>
          <div>
            <Field label="Flight No." name="flightNo" component={MyField} />
          </div>
          <div>
            <Field label="Aircraft Reg." name="acReg" component={MyField} />
          </div>
          <div>
            <Field label="Date" name="date" component={MyField} />
          </div>
          <div>
            <Field label="Time" name="time" component={MyField} />
          </div>
          <div>
            <Field label="From" name="from" component={MyField} />
          </div>
          <div>
            <Field label="To" name="to" component={MyField} />
          </div>
          <div>
            <Field label="Company" name="company" component={MyField} />
          </div>
          <Button type="submit">submit</Button>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  );
}

export default MyForm;
