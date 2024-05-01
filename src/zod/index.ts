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
  email: z.string().trim().min(5).endsWith("com").optional(),
  contact: z.string().trim().min(10).max(10),
  gst_number: z.string().trim().optional().default("-"),
});

export const ProductSchema = z.object({
  name: z.string().trim().min(3),
  price: z.string().min(3),
  serial_number: z.string().trim().min(3),
  type: z.string().trim().min(3),
  GST: z.string().trim(),
  vehicle_name: z.string().trim().optional().default("-"),
  vehicle_number: z.string().trim().optional().default("-"),
});
