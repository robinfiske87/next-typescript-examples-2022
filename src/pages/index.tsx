import React, { useState } from 'react';
import Link from 'next/link';
import { Input, PrimaryButton, SecondaryButton } from '../components/reusableSchema';
import { z } from "zod";

const Home: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [storedForm, setStoredForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<string[]>([]);

// Schema for form validaton. Name can be any string between 1 and 40 characters long, email must be a valid email address and message can be any string between 1 and 100 characters long.
  const formDataSchema = z.object({
    name: z.string().min(1).max(40).regex(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/),
    email: z.string().email(),
    message: z.string().min(1).max(100)
  });
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Check if all fields are empty and return if true
    if (Object.values(formData).every(val => val === '')) return setErrors([]);
    try {
      const validatedFormData = formDataSchema.parse(formData);
      setStoredForm(validatedFormData);
      setErrors([]);
      // submit validatedFormData to server or do something else with it here
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
    <main className="mx-20 my-20 bg-indigo-50">
    <form onSubmit={handleSubmit} >
      <Input
        label='Name'
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <Input
        label='Email'
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <Input
        label='Message'
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
      />
      <PrimaryButton>
        Submit
      </PrimaryButton>
      <SecondaryButton
        onClick={handleAbort}
      >
        Abort
      </SecondaryButton>
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
    {!Object.values(storedForm).every(val => val === '') && (
        <div>
          <h2 className="text-2xl font-bold">Stored Form Data</h2>
          <p>Name: {storedForm.name}</p>
          <p>Email: {storedForm.email}</p>
          <p>Message: {storedForm.message}</p>
        </div>
      )}
    
  <SecondaryButton >
    <Link href="/examples">To examples and API state handling</Link>
  </SecondaryButton>
    </main>
  );
};

export default Home;
