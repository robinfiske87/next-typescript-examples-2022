import React from "react";
import { Formik, Form, Field } from "formik";
import {
  Input,
  PrimaryButton,
  SecondaryButton,
  Radio,
} from "./reusableComponents";
import type { StoredData } from "../pages/index";

// Props for the form component.
type FormProps = {
  setStoredData: React.Dispatch<React.SetStateAction<StoredData>>; // Function to set the stored data state in the parent component.
};

// Form component.
const FormikForm: React.FC<FormProps> = (props) => {
  // Destructure the setStoredData prop from the props object.
  const { setStoredData } = props;

  // An array of options to be used in the Select and Radio components
  const ageOptions = [
    { value: "under 18", label: "under 18" },
    { value: "18-25", label: "18-25" },
    { value: "26-40", label: "26-40" },
    { value: "41-67", label: "41-67" },
    { value: "68+", label: "68+" },
  ];

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        ageBracket: "",
        message: "",
      }}
      validate={(values) => {
        const errors: { [key: string]: string } = {};

        if (!values.name) {
          errors.name = "Required";
        } else if (!/^[a-zA-Z ]+$/.test(values.name)) {
          errors.name = "Invalid name";
        }

        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }

        if (!values.ageBracket) {
          errors.ageBracket = "Required";
        }

        if (values.message.length > 140) {
          errors.message = "Message must be 140 characters or less";
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setStoredData({ data: [values] });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, resetForm, errors }) => (
        <Form>
          {/* Form header */}
          <h2 className="mb-5 ml-1 text-2xl font-bold text-gray-800">Form</h2>

          {/* Form element */}
          {/* Input for name */}
          <Field as={Input} label="Name" name="name" placeholder="Name" />
          {errors.name && <div className="text-red-500">{errors.name}</div>}

          {/* Input for email */}
          <Field as={Input} label="Email" name="email" placeholder="Email" />
          {errors.email && <div className="text-red-500">{errors.email}</div>}

          {/* Select for age bracket */}
          <Field
            as={Radio}
            label="Age"
            name="ageBracket"
            options={ageOptions}
            placeholder="Age"
          />
          {errors.ageBracket && (
            <div className="text-red-500">{errors.ageBracket}</div>
          )}

          {/* Input for message */}
          <Field
            as={Input}
            label="Message"
            name="message"
            placeholder="Message"
          />
          {errors.message && (
            <div className="text-red-500">{errors.message}</div>
          )}

          {/* Button to submit data to state, or use something else if you want it to persist */}
          <PrimaryButton type="button" disabled={isSubmitting}>
            Submit
          </PrimaryButton>

          {/* Button to clear the form. Only available if something is written in the form*/}
          <SecondaryButton
            type="button"
            disabled={isSubmitting}
            onClick={resetForm}
          >
            Clear Form
          </SecondaryButton>
        </Form>
      )}
    </Formik>
  );
};

export default FormikForm;
