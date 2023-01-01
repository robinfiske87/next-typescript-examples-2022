import React from "react";
import { Formik, Form, Field } from "formik";
import { formDataSchema } from "../utils/schemas";
import { toFormikValidationSchema } from 'formik-adapter-zod';
import {
  Input,
  Radio,
} from "./reusableComponents";
import type { StoredData } from "../pages/formik";

// Props for the form component.
type FormProps = {
  setStoredData: React.Dispatch<React.SetStateAction<StoredData>>; // Function to set the stored data state in the parent component.
};

// Form component.
const FormikForm: React.FC<FormProps> = (props) => {
  // Destructure the setStoredData prop from the props object.
  const { setStoredData } = props;

  const Schema = formDataSchema;

  // An array of options to be used in the Radio component
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
      validationSchema={toFormikValidationSchema(Schema)}
      onSubmit={(values, { setSubmitting }) => {
        setStoredData((prevStoredData) => ({
          ...prevStoredData,
          data: [...prevStoredData.data,values] }));
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, resetForm, errors }) => (
        <Form>
          {/* Form header */}
          <h2 className="mb-5 ml-1 text-2xl font-bold text-gray-800">
            Formik Form
          </h2>

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
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1 shadow-md"  disabled={isSubmitting}>
            Submit
          </button>

          {/* Button to clear the form. Only available if something is written in the form*/}
          <button
            type="reset"
            className="bg-orange-400 hover:bg-orange-500 text-gray-800 font-bold py-2 px-4 rounded m-1 shadow-md`"
            disabled={isSubmitting}
            onClick={() => {resetForm()}}
          >
            Clear Form
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikForm;
