import React from 'react';
import Link from 'next/link';
import { NavigationButton } from '../components/reusableSchema';
import { Form } from '../components/form';


const Home: React.FC = () => {

  return (
    <main className="mx-20 my-20 bg-indigo-50">

      { // Form data is stored in the formData state variable in the form component. The form component is imported from the form.tsx file. I handle states in the form component.
      
      //I have also added a link to the examples page.
      }
      
      <Form />
    
      <NavigationButton >
        <Link href="/examples">To examples and API state handling</Link>
      </NavigationButton>
    </main>
  );
};

export default Home;
