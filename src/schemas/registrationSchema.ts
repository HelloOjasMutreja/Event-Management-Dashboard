import { z } from "zod";

export const registrationSchema = z.object({
  registration_number: z
    .string()
    .min(1, "Registration number is required")
    .regex(/^RA/i, "Registration number must start with 'RA'"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(255),
  email: z
    .string()
    .email("Enter a valid email address"),
  section: z
    .string()
    .max(50)
    .optional()
    .or(z.literal("")),
  department: z
    .string()
    .min(1, "Department is required")
    .max(255),
  year: z
    .string()
    .min(1, "Year is required"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(20)
    .optional()
    .or(z.literal("")),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
