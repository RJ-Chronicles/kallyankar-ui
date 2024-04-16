import { Contact } from "lucide-react";
import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Username is required",
    })
    .min(5)
    .endsWith("com"),

  password: z.string({ required_error: "Password is required" }).trim().min(5),
});

export const CustomerSchema = z.object({
  name: z.string().trim().min(3),
  last_name: z.string().trim().min(3),
  address: z.string().trim().min(3),
  email: z.string().trim().min(5).endsWith("com"),
  contact: z.string().trim().min(10).max(10),
  gst_number: z.string().trim().optional(),
});
