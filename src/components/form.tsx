import React, { useState, useEffect } from 'react';
import { Input, PrimaryButton, SecondaryButton, Radio } from './reusableComponents';
import { z } from "zod";
import { formDataSchema } from '../utils/schemas';
import type { StoredData } from '../pages/index';

// Props for the form component.
type FormProps = {
  setStoredData: React.Dispatch<React.SetStateAction<StoredData>>; // Function to set the stored data state in the parent component.
};

// Form component.
const Form: React.FC<FormProps> = (props) => {
  // Destructure the setStoredData prop from the props object.
  const { setStoredData } = props;

  // The radioValue state variable, initialized with the value 'option1'
  const [radioValue, setRadioValue] = useState('');

  // Use state for the form data.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    ageBracket: '',
    message: ''
  });

  // Use state for the stored form data. This is to exemplify state handling.
  const [storedForm, setStoredForm] = useState({
    name: '',
    email: '',
    ageBracket: '',
    message: ''
  });

    // Use state for form validation errors.
    const [errors, setErrors] = useState<string[]>([]);

  // Use effect to update the formData state variable when the radioValue state variable changes.
  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      ageBracket: radioValue
    }));  
  }, [radioValue]);
  
  // An array of options to be used in the Select and Radio components
  const ageOptions = [
    { value: 'under 18', label: 'under 18' },
    { value: '18-25', label: '18-25' },
    { value: '26-40', label: '26-40' },
    { value: '41-67', label: '41-67' },
    { value: '68+', label: '68+' },];


  // This is the form as shown in the index page. The form is a controlled component, meaning that the form data is stored in the formData state variable. The form data is stored in a state. This is to exemplify state handling. The forms created are pushed to an array. I have added a button to log the data to the console. I have also added a button to reset the data store to an empty array.
  return (
    <>
      {/* Form header */}
      <h2 className="text-2xl font-bold mb-5 ml-1">Form</h2>

      {/* Form element */}
      <form onSubmit={handleSubmit} >

        {/* Input for name */}
        <Input
          label='Name'
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />

        {/* Input for email */}
        <Input
          label='Email'
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />

        {/* Select for age bracket */}
        <Radio label="Age" name="radio" options={ageOptions} value={radioValue} onChange={handleRadioChange} />

        {/* Input for message */}
        <Input
          label='Message'
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
        />

        {/* Button to submit data to state, or use something else if you want it to persist */}
        <PrimaryButton type='submit'>
          Submit
        </PrimaryButton>

        {/* Button to clear the form. Only available if something is written in the form*/}
        {Object.values(formData).some(val => val !== '') && 
        <SecondaryButton
          onClick={handleAbort}
          type='reset'
        >
          Clear Form
        </SecondaryButton>}
      </form>

      {// Display errors if there are any
      }
      {errors.length > 0  && (
      <ul className="my-4">
      {errors.map((error, index) => {
        return <li key={index} className="text-red-500">{error}</li>
        })}
      </ul>
      )}

      {/* This is the currently stored form. Previous forms are stored in another array if not cleared.  */}
      {!Object.values(storedForm).every(val => val === '') && (
          <div className='m-1 overflow-auto max-w-sm'>
            <h2 className="text-2xl font-bold">Stored Form Data</h2>
            <p className="whitespace-normal text-wrap">Name: {storedForm.name}</p>
            <p className="whitespace-normal text-wrap">Email:: {storedForm.email}</p>
            <p className="whitespace-normal text-wrap">Age Bracket: {storedForm.ageBracket}</p>
            <p className="whitespace-normal text-wrap">Message: {storedForm.message}</p>
          </div>
        )}
    
    </>
  );


  // Functions for handling form events. They are defined here as to not clutter the JSX.

  // A function to be called when the value of the Radio component changes
  function handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
    setRadioValue(event.target.value);
  }

  // Event handler for form input changes.
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    }

  // Event handler for form submission.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Check if all fields are empty and return if true
    if (Object.values(formData).every(val => val === '')) return setErrors([]);
    
    try {
      const validatedFormData = formDataSchema.parse(formData);
      setStoredForm(validatedFormData);
      setErrors([]);
      // submit validatedFormData to server or do something else with it here. I am just storing it in a state array in the index.tsx file for now. It can be displayed in the console or removed with the presented buttons.
      setStoredData((prevStoredData) => ({ ...prevStoredData, data: [...prevStoredData.data, validatedFormData] }));

    } catch (error ) {
      if(error instanceof z.ZodError)
      setErrors(error.issues.map(issue => issue.message));
    }
  }

  function handleAbort() {
    setRadioValue('')

    setFormData({
      name: '',
      email: '',
      ageBracket: '',
      message: ''
    })

    setStoredForm({
      name: '',
      email: '',
      ageBracket: '',
      message: ''
    })
    
    setErrors([]);
  }
  
};



export { Form };
