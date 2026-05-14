import { CalorieResponse } from "@/types";
import {
 Card,
 CardHeader,
 CardTitle,
 CardDescription,
 CardContent
} from "./ui/card";
import { Field } from "./ui/field";
import { Label } from "./ui/label";

interface ResultCardProps {
  result: CalorieResponse;
};

export function ResultCard({
  result
}: ResultCardProps) {

  return (
    <Card className="w-full sm:max-w-m">
      <CardHeader className="border-b border-b-gray-300">
        <CardTitle className="text-2xl">Your Result for {result.dish_name.toUpperCase()}</CardTitle>
        <CardDescription>
          Your dis details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <h3 className="text-md text-amber-700 dark:text-amber-300">General Info:</h3>
          <div className="grid md:grid-cols-2 gap-4 mt-3">
            <div>
              <Field className="py-3 border-b border-b-gray-200 text-gray-600">
                <Label className="dark:text-gray-300"> Dish Name: </Label>
                <input defaultValue={result.dish_name}
                  disabled
                  className='w-ful bg-gray-100 border-gray-300 border py-2 px-2 rounded-sm leading-0' />
              </Field>
              <Field className="py-3 border-b border-b-gray-200 text-gray-600">
                <Label className="dark:text-gray-300"> Servings: </Label>
                <input defaultValue={result.servings}
                  disabled
                  className='w-ful bg-gray-100 border-gray-300 border py-2 px-2 rounded-sm leading-0' />
              </Field>
            </div>
            <div>
              <Field className="py-3 border-b border-b-gray-200 text-gray-600">
                <Label className="dark:text-gray-300">Source:</Label>
                <input defaultValue={result.source}
                  disabled
                  className='w-ful bg-gray-100 border-gray-300 border py-2 px-2 rounded-md leading-0' />
              </Field>
              <Field className="py-3 border-b border-b-gray-200 text-gray-600">
                <Label className="dark:text-gray-300"> Calories Per Serving: </Label>
                <input defaultValue={result.calories_per_serving}
                  disabled
                  className='w-ful bg-gray-100 border-gray-300 border py-2 px-2 rounded-md leading-0' />
              </Field>          
            </div>
          </div>
          <Field className="py-3 border-b border-b-gray-200 text-gray-600">
            <Label className="dark:text-gray-300"> Total Calories: </Label>
            <input defaultValue={result.total_calories}
              disabled
              className='w-ful bg-gray-100 border-gray-300 border py-2 px-2 rounded-md leading-0' />
          </Field>
        </div>
        <div className="py-4">
          <h3 className="text-md text-amber-700 dark:text-amber-300">Macronutrients Per Serving:</h3>
          <div className="grid md:grid-cols-2 gap-4 mt-3">
            <Field className="py-3 border-b border-b-gray-200 text-gray-600">
              <Label className="dark:text-gray-300">  Protein: </Label>
              <input defaultValue={result.macronutrients_per_serving?.protein}
                disabled
                className='w-ful bg-gray-100 border-gray-300 border py-2 px-2 rounded-md leading-0' />
            </Field>
            <Field className="py-3 border-b border-b-gray-200 text-gray-600">
              <Label className="dark:text-gray-300"> Carbs: </Label>
              <input defaultValue={result.macronutrients_per_serving?.carbohydrates}
                disabled
                className='w-ful bg-gray-100 border-gray-300 border py-2 px-2 rounded-md leading-0' />
            </Field>
            <Field className="py-3 border-b border-b-gray-200 text-gray-600">
              <Label className="dark:text-gray-300">Fiber: </Label>
              <input defaultValue={result?.macronutrients_per_serving?.fiber || ''}
                disabled
                className='w-ful bg-gray-100 border-gray-300 border py-2 px-2 rounded-md leading-0' />
            </Field>
            <Field className="py-3 border-b border-b-gray-200 text-gray-600">
              <Label className="dark:text-gray-300"> Sugars: </Label>
              <input defaultValue={result.macronutrients_per_serving?.sugars}
                disabled
                className='w-ful bg-gray-100 border-gray-300 border py-2 px-2 rounded-md leading-0' />
            </Field>
          </div>
          <Field className="py-3 border-b border-b-gray-200 text-gray-600">
            <Label className="dark:text-gray-300"> Total Fat: </Label>
            <input defaultValue={result.macronutrients_per_serving?.total_fat}
              disabled
              className='w-ful bg-gray-100 border-gray-300 border py-2 px-2 rounded-md leading-0' />
          </Field>
        </div>
        <div className="py-4">
          <h3 className="text-md text-amber-700 dark:text-amber-300">Total Macronutrients:</h3>
          <div className="grid md:grid-cols-2 gap-4 mt-3">
            <Field className="py-3 border-b border-b-gray-200 text-gray-600">
              <Label className="dark:text-gray-300"> Protein: </Label>
              <input defaultValue={result.total_macronutrients?.protein}
                disabled
                className='w-ful bg-gray-100 border-gray-300 border py-2 px-2 rounded-md leading-0' />
            </Field>
            <Field className="py-3 border-b border-b-gray-200 text-gray-600">
              <Label className="dark:text-gray-300"> Carbs: </Label>
              <input defaultValue={result.total_macronutrients?.carbohydrates}
                disabled
                className='w-ful bg-gray-100 border-gray-300 border py-2 px-2 rounded-md leading-0' />
            </Field>
            <Field className="py-3 border-b border-b-gray-200 text-gray-600">
              <Label className="dark:text-gray-300">Fiber: </Label>
              <input defaultValue={result?.total_macronutrients?.fiber  || ''}
                disabled
                className='w-ful bg-gray-100 border-gray-300 border py-2 px-2 rounded-md leading-0' />
            </Field>
            <Field className="py-3 border-b border-b-gray-200 text-gray-600">
              <Label className="dark:text-gray-300">Sugars: </Label>
              <input defaultValue={result.total_macronutrients?.sugars}
                disabled
                className='w-ful bg-gray-100 border-gray-300 border py-2 px-2 rounded-md leading-0' />
            </Field>
          </div>
          <Field className="py-3 border-b border-b-gray-200 text-gray-600">
            <Label className="dark:text-gray-300"> Total Fat: </Label>
            <input defaultValue={result.total_macronutrients?.total_fat}
              disabled
              className='w-ful bg-gray-100 border-gray-300 border py-2 px-2 rounded-md leading-0' />
          </Field>
        </div>
      </CardContent>
    </Card>
  )
};

export default ResultCard;