import {z} from "zod";
import { UserFiedls } from "@/types";

export const registerSchema = z.object({
  [UserFiedls.FIRST_NAME]: z.string().min(1, "First name required"),
  [UserFiedls.LAST_NAME]: z.string().min(1, "Last name required"),
  [UserFiedls.EMAIL]: z.string().email(),
  [UserFiedls.PASSWORD]: z.string().min(8, "Minimum 8 characters"),
});

export const loginSchema = z.object({
  [UserFiedls.EMAIL]: z.string().email(),
  [UserFiedls.PASSWORD]: z.string().min(8, "Minimum 8 characters"),
});

export const mealSchema = z.object({
  dish_name: z.string().min(1, "Dish name required").max(120),
  servings: z.coerce.number().positive("Servings must be greater than 0"),
});

// Infer the type from the schema
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type MealInput = z.infer<typeof mealSchema>;