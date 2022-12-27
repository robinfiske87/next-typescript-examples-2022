import React, { useState } from 'react';
import Link from 'next/link';
import { PrimaryButton, SecondaryButton } from '../components/reusableComponents';
import { Form } from '../components/form';

export type StoredData = {
  data: (string | { name: string; email: string; ageBracket: string; message: string; })[];
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

      { // Form data is stored in the formData state variable in the form component. The data from the form is stored in a state. This is to exemplify state handling. The forms created are pushed to an array. I have added a button to log the data to the console. I have also added a button to reset the data store to an empty array.
      }

      <Form setStoredData={setStoredData} />

      {/* Button to log the storedData state variable to the console */}
      <PrimaryButton
        type='submit' 
        onClick={() => console.log(storedData)}>Log data
      </PrimaryButton>

      {/* Button to reset the storedData state variable to an empty data array */}
      <SecondaryButton 
        type='reset'
        onClick={resetDataStore}>Remove Stored Data
      </SecondaryButton>

      {/* Button to navigate to the examples page */}
      <br/>
      <PrimaryButton type='navigate' >
        <Link href="/examples">To examples and API state handling</Link>
      </PrimaryButton>
    </main>
  );
};

export default Home;
