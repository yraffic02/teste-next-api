import { z } from "zod";

export const FormLeadSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters long.",
    }),
    email: z.string().email({
        message: "Invalid email address.",
    }),
    telefone: z.string().min(10, {
        message: "Phone number must be at least 10 characters long.",
    }).regex(/^[\d\s\-\+\(\)]+$/, {
        message: "Phone number can only contain numbers, spaces, dashes, and parentheses.",
    }),
});