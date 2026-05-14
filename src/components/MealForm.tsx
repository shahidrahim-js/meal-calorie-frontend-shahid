"use client"

import React from 'react';
import { useMealStore } from '@/stores/mealStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MealInput, MealOutput, mealSchema } from '@/lib/validations';
import { getCalories } from '@/lib/api';
import { CalorieFields, LoginUserError } from '@/types';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Field, FieldLabel } from './ui/field';
import { Button } from './ui/button';
import { Spinner } from './ui/spinner';

function MealForm() {
  const setResult = useMealStore((state) => state.setResult);

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting}
  } = useForm<MealInput, MealOutput>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      servings: 1,
    },
  });

  async function onSubmit(values: MealInput) {
    try {
      const data = await getCalories(values);
      setResult(data);
      toast.success("Calories fetched");
    } catch (err) {
      const error = err as LoginUserError;
      switch (error.status) {
        case 404:
          toast.error("Dish not found");
          break;
        case 422:
          toast.error("No calorie data available");
          break;
        case 429:
          toast.error(
            `Rate limited. Retry in ${error.retryAfter}s`
          );
          break;
        default:
          toast.error("Something went wrong");
      }
    }
  };

  return (
    <Card className="w-full sm:max-w-lg">
      <CardHeader className="border-b border-b-gray-300">
        <CardTitle className='text-2xl text-gray-800 dark:text-white'>Mael Calories</CardTitle>
        <CardDescription>
          Know your dish calories.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <Field className='py-0.5'>
            <FieldLabel className='font-medium'>
              Dish Name <span className="text-destructive">*</span>
            </FieldLabel>
            <input
              {...register(CalorieFields.DISH_NAME)}
              placeholder="Dish Name"
              className='w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 
                border-gray-300 border py-2 px-2 rounded-md leading-0 text-gray-900'
            />
            {errors.dish_name && <span className='text-red-400 text-xs'>{errors.dish_name.message}</span>}
          </Field>
          <Field className='py-0.5'>
            <FieldLabel className='font-medium'>
              Servings Quantity <span className="text-destructive">*</span>
            </FieldLabel>
            <input
              type="number"
              step="1"
              {...register(CalorieFields.SERVINGS)}
              placeholder='Servings'
              className='w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 
                border-gray-300 border py-2 px-2 rounded-md leading-0 text-gray-900'
            />
            {errors.servings && <span className='text-red-400 text-xs'>{errors.servings.message}</span>}
          </Field>
          <Field>
            <Button type="submit"
              disabled={isSubmitting}
              className='cursor-pointer  border-b-amber-500 text-red-950 bg-amber-300 hover:bg-amber-500
              transition-all py-5'>
              Search Details {isSubmitting ? <Spinner data-icon="inline-start" /> : ''}
            </Button >
          </Field>
        </form>
      </CardContent>
    </Card>
  );
};

export default MealForm;
