import React, { useState } from "react";
import Link from "next/link";
import {
  PrimaryButton,
  SecondaryButton,
} from "../components/reusableComponents";

// Import the Form component. I have one custom form and one form created with Formik. In the custom one, validation is done with zod. In the Formik one, validation is done with Formik.
import { Form } from "../components/form";
//import FormikForm from "../components/formikForm";

export type StoredData = {
  data: (
    | string
    | { name: string; email: string; ageBracket: string; message?: string }
  )[];
};

const Home: React.FC = () => {
  // Declare a state variable called storedData with an initial value of an empty data array
  const [storedData, setStoredData] = useState<StoredData>({ data: [] });

  // Declare a function to reset the storedData state variable to an empty data array
  function resetDataStore() {
    setStoredData({ data: [] });
  }

  return (
    <main className="mx-20 my-20 bg-indigo-50">
      {/* Form data is stored in the formData state variable in the form component. The data from the form is stored in a state. This is to exemplify state handling. The forms created are pushed to an array. I have added a button to log the data to the console. I have also added a button to reset the data store to an empty array.*/ }

    
      <Form setStoredData={setStoredData} />
      
      {/* <FormikForm setStoredData={setStoredData} /> */ }

      <div className="bg-indigo-100 mt-5 pt-5 pb-5">
        <p className="text-xl leading-tight m-1 text-gray-800">
          This block is for navigation and orientation.
        </p>
        {/* Button to log the storedData state variable to the console */}
        <PrimaryButton type="submit" onClick={() => console.log(storedData)}>
          Log data to console
        </PrimaryButton>

        {/* Button to reset the storedData state variable to an empty data array */}
        <SecondaryButton type="reset" onClick={resetDataStore}>
          Remove Stored Data
        </SecondaryButton>

        {/* Button to navigate to the examples page */}
        <br />
        <PrimaryButton type="navigate">
          <Link href="/formik">To formik form</Link>
        </PrimaryButton>
        <PrimaryButton type="navigate">
          <Link href="/examples">To examples and API state handling</Link>
        </PrimaryButton>
      </div>
    </main>
  );
};

export default Home;
