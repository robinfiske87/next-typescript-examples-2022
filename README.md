## Instructions for Nextjs Typescript example repo

This is a simple project to exemplify some reusable components, a simple form that lets you store the data, as well as some state handling of an API requests. It uses Tailwind for styling.

#### How to set it up

- Download repo locally

- Navigate to root of repo in terminal

- Install packages with command: npm i (or whatever manager package manager you use)

- Initiate locally with npm run dev from root (nodemon is installed as a dev dependency)

- View the project in you browser on localhost:3000 (or higher if port is taken)


#### What is happening

- You must fill in form with name, email and message. There are some validation being done before the form is submitted. 

  1. Name cant have more than single spaces, and no numbers. 
  2. Email must be valid.
  3. Must choose an age bracket with radio buttons
  4. Message cant be more than 100 characters long, and must be at least 2 characters long.
  
- The form is validated by zod. 

- You can navigate to examples, or by providing /examples suffix to url.

  1. Examples of the reusable components provided. 
  The page is storing data in an array which is submitted. Data is not persisted and is stored in state. 

  2. Examples of API state handling in /examples. This is a rendered out list from jsonplaceholder API. State is handled by React Query.

#### Alternative form
- I made a similar form using the formik library for building react forms. It is commented out in the index file. Alternatively see it at the url-endpoint /formik or follow navigation-button.
