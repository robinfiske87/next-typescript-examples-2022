import { z } from "zod";
  
// Schema for form data validation.
export const formDataSchema = z.object({
  name: z.string().regex(/^[a-zA-Z ]+$/), // Name can be any string, but no special characters.
  email: z.string().email(), // Email must be a valid email address.
  ageBracket: z.string().min(1).max(12), // Age bracket can be any string between 1 and 12 characters long.
  message: z.string().min(1).max(100).optional() // Message can be any string between 1 and 100 characters long. Optional
  });