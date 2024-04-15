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
