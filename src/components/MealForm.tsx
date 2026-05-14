"use client"

import React from 'react';
import { useMealStore } from '@/stores/mealStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MealInput, mealSchema } from '@/lib/validations';
import { getCalories } from '@/lib/api';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Field } from './ui/field';
import { Button } from './ui/button';
import { Spinner } from './ui/spinner';

function MealForm() {
  const setResult = useMealStore((state) => state.setResult);

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting}
  } = useForm<MealInput>({
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
    } catch (error: any) {
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
      <CardHeader>
        <CardTitle>Mael Calorie</CardTitle>
        <CardDescription>
          Know your Mael Calories.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <Field>
            <input
              {...register("dish_name")}
              placeholder="Dish Name"
              className='w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 
                border-gray-300 border py-2 px-2 rounded-md leading-0 text-gray-900'
            />
            {errors.dish_name && <span className='text-red-400 text-xs'>{errors.dish_name.message}</span>}
          </Field>
          <Field>
            <input
              type="number"
              step="1"
              {...register("servings")}
              placeholder='Servings'
              className='w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 
                border-gray-300 border py-2 px-2 rounded-md leading-0 text-gray-900'
            />
            {errors.servings && <span className='text-red-400 text-xs'>{errors.servings.message}</span>}
          </Field>
          <Field>
            <Button type="submit"
              disabled={isSubmitting}
              className='cursor-pointer text-white bg-red-800 hover:bg-red-900 transition-all py-5'>
              Search Details {isSubmitting ? <Spinner data-icon="inline-start" /> : ''}
            </Button >
          </Field>
        </form>
      </CardContent>
    </Card>
  );
};

export default MealForm;
