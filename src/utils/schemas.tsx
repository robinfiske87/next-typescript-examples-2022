import { z } from "zod";
  
// Schema for form data validation.
export const formDataSchema = z.object({
  name: z.string().regex(/^[a-zA-Z ]+$/, {message: "Valid name is required" }), // Name can be any string, but no special characters.
  email: z.string().email({
    message: "Must be a valid email",
  }), // Email must be a valid email address.
  ageBracket: z.string().min(1, {message: "Must choose age bracket" }).max(10, {message: "Must choose age bracket" }), // Age bracket can be any string between 1 and 12 characters long.
  message: z.string().min(0).max(140, {message: "Message can only be 140 characters long" }).optional() // Message can be any string between 1 and 100 characters long. Message is optional  
  });