import React, { useState } from 'react';
import { Input, PrimaryButton, SecondaryButton } from './reusableComponents';
import { z } from "zod";
import type { StoredData } from '../pages/index';

// Dispatch type for setting state with a new value or by a function that receives the previous state and returns a new state value.
type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);

// Props for the form component.
type FormProps = {
  setStoredData: Dispatch<SetStateAction<StoredData>>; // Function to set the stored data state in the parent component.
};

// Form component.
const Form: React.FC<FormProps> = (props) => {
  // Destructure the setStoredData prop from the props object.
  const { setStoredData } = props;
  
  // Use state for the form data.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  // Use state for the stored form data.
  const [storedForm, setStoredForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  // Use state for form validation errors.
  const [errors, setErrors] = useState<string[]>([]);

  // Schema for form data validation.
  const formDataSchema = z.object({
    name: z.string().min(1).max(40).regex(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/), // Name can be any string between 1 and 40 characters long.
    email: z.string().email(), // Email must be a valid email address.
    message: z.string().min(1).max(100) // Message can be any string between 1 and 100 characters long.
  });

    // Event handler for form input changes.
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    };
  
    // Event handler for form submission.
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
  };

  const handleAbort = () => {
    setFormData({
      name: '',
      email: '',
      message: ''
    })

    setStoredForm({
      name: '',
      email: '',
      message: ''
    })

    setErrors([]);
    
  };

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

        {/* Input for message */}
        <Input
          label='Message'
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
        />

        {/* Button to submit data to state, or use something else if you want it to persist */}
        <PrimaryButton>
          Submit
        </PrimaryButton>

        {/* Button to clear the form. Only available if something is written in the form*/}
        {Object.values(formData).some(val => val !== '') && 
        <SecondaryButton
          onClick={handleAbort}
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
            <p className="whitespace-normal text-wrap">Email: {storedForm.email}</p>
            <p className="whitespace-normal text-wrap">Message: {storedForm.message}</p>
          </div>
        )}
    
    </>
  );
};

export { Form };
