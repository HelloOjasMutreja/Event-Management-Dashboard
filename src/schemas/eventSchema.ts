import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(255),
  description: z.string().min(10, "Description must be at least 10 characters"),
  date: z.string().min(1, "Date is required"),
  time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  capacity: z
    .number({ message: "Capacity must be a number" })
    .int()
    .min(1, "Capacity must be at least 1"),
  category: z.enum(["Workshop", "Social", "Competition", "Seminar", "Other"]),
  status: z.enum(["draft", "published", "cancelled", "completed"]),
  image_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type EventFormData = z.infer<typeof eventSchema>;
