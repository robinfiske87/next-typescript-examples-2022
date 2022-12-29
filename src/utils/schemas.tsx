import { z } from "zod";
  
// Schema for form data validation.
export const formDataSchema = z.object({
  name: z.string().min(1).max(40).regex(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/), // Name can be any string between 1 and 40 characters long.
  email: z.string().email(), // Email must be a valid email address.
  ageBracket: z.string().min(1).max(10), // Age bracket can be any string between 1 and 40 characters long.
  message: z.string().min(1).max(100) // Message can be any string between 1 and 100 characters long.
  });