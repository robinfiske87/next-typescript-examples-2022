import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "react-query";
import {
  Input,
  Select,
  Radio,
  PrimaryButton,
  SecondaryButton,
} from "../components/reusableComponents";

// A function that fetches data from an API
const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
};

// An array of options to be used in the Select and Radio components
const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

// The Examples component, which is a functional component
const Examples: React.FC = () => {
  // Use the useQuery hook to fetch data from the API
  const { data, isLoading, error } = useQuery("users", fetchUsers);

  // The inputValue state variable, initialized with an empty string
  const [inputValue, setInputValue] = useState("");
  // The selectValue state variable, initialized with the value 'option1'
  const [selectValue, setSelectValue] = useState("option1");
  // The radioValue state variable, initialized with the value 'option1'
  const [radioValue, setRadioValue] = useState("option1");
  // The submittedValues state variable, initialized with an empty array
  const [submittedValues, setSubmittedValues] = useState<string[]>([]);

  // A function to be called when the value of the Input component changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // A function to be called when the value of the Select component changes
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
  };

  // A function to be called when the value of the Radio component changes
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(event.target.value);
  };

  // A function to be called when the PrimaryButton component is clicked
  function handleSubmit() {
    // Check if the input value is empty
    if (!inputValue) {
      // If the input value is empty, return early
      return;
    }
    // Call the function that takes a value as an argument here
    setSubmittedValues([...submittedValues, inputValue]);
    // Reset the input value to an empty string
    setInputValue("");
  }

  // A function to be called when the SecondaryButton component is clicked
  const handleReset = () => {
    // Reset the input value to an empty string
    setInputValue("");
    // Reset the submittedValues array to an empty array
    setSubmittedValues([]);
  };

  // A type to define the shape of the data returned from the API
  type User = {
    id: string;
    name: string;
    email: string;
  };

  // If the data is loading, return a loading message
  if (isLoading) return <div>Loading...</div>;

  // If there is an error, return an error message
  if (error) return <div>Error fetching from the API </div>;

  return (
    <main className="mx-20 my-20 bg-indigo-50">
      <h1 className="mb-5 ml-1 text-2xl font-bold text-gray-800">
        Reusable Components
      </h1>
      <div className="mb-2">
        <Input
          label="Input"
          name="input"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Input"
        />

        <Select
          label="Select"
          name="select"
          options={options}
          value={selectValue}
          onChange={handleSelectChange}
        />

        <Radio
          label="Radio"
          name="radio"
          options={options}
          value={radioValue}
          onChange={handleRadioChange}
        />

        <PrimaryButton type="submit" onClick={handleSubmit}>
          Submit
        </PrimaryButton>

        <SecondaryButton type="alarm" onClick={handleReset}>
          Abort
        </SecondaryButton>
      </div>
      {submittedValues.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-gray-800">Submitted data</h2>
          <div className="m-1 rounded-lg bg-indigo-200 p-4 shadow-lg">
            {submittedValues.length > 0 &&
              submittedValues.map((value, index) => (
                <li key={index} className="mb-1">
                  {value}
                </li>
              ))}
          </div>
        </>
      )}

      <PrimaryButton type="navigate">
        <Link href="/">Back to form</Link>
      </PrimaryButton>

      <h2 className="mt-5 ml-1 text-2xl font-bold text-gray-800">React Query</h2>
      <div className="m-1 rounded-lg bg-indigo-200 p-4 shadow-lg">
        {data.map((user: User) => (
          <div key={user.id} className="mb-4">
            <h3 className="text-lg font-bold">{user.name}</h3>
            <p className="text-sm text-gray-700">{user.email}</p>
            <hr />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Examples;
