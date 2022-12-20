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


  const formDataSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    message: z.string().min(2).max(100)
  });
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Object.values(formData).every(val => val === '')) return setErrors([]);
    try {
      const validatedFormData = formDataSchema.parse(formData);
      setStoredForm(validatedFormData);
      setErrors([]);
      // submit validatedFormData to server or do something else with it here
    } catch (error ) {
      if(error instanceof z.ZodError)
      setErrors([...errors, error.message]);
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
        // disabled={Object.values(formData).every(val => val === '')}
      >
        Abort
      </SecondaryButton>
    </form>
    
    <div>
      <h2 className="text-2xl font-bold">Stored Form Data</h2>
      <p>Name: {storedForm.name}</p>
      <p>Email: {storedForm.email}</p>
      <p>Message: {storedForm.message}</p>
    </div>
    {errors.length > 0  && (
  <ul className="my-4">
    {errors.slice(-1).map((error, index) => {
    return <li key={index} className="text-red-500">{error}</li>
    })}
  </ul>
)}
  <SecondaryButton >
    <Link href="/examples">To examples and API state handling</Link>
  </SecondaryButton>
    </main>
  );
};

export default Home;
