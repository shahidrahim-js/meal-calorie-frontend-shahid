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
        <CardTitle className="text-2xl">Result for {result?.dish_name?.toUpperCase()}</CardTitle>
        <CardDescription>
          Your dish details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <h3 className="text-md text-amber-700 dark:text-amber-300">General Info:</h3>
          <div className="grid md:grid-cols-2 gap-4 mt-3">
            <div>
              <Field className="py-3 border-b border-b-gray-200 text-gray-600">
                <Label className="dark:text-gray-300"> Dish Name: </Label>
                <div className='w-ful text-gray-900 bg-gray-100 border-gray-300 border py-4.5 px-2 rounded-sm leading-0'>
                  {result?.dish_name || ''}
                </div>
              </Field>
              <Field className="py-3 border-b border-b-gray-200 text-gray-600">
                <Label className="dark:text-gray-300"> Servings: </Label>
                <div className='w-ful text-gray-900 bg-gray-100 border-gray-300 border py-4.5 px-2 rounded-sm leading-0'>
                  {result?.servings ?? ''}
                </div>
              </Field>
            </div>
            <div>
              <Field className="py-3 border-b border-b-gray-200 text-gray-600">
                <Label className="dark:text-gray-300">Source:</Label>
                <div className='w-ful text-gray-900 bg-gray-100 border-gray-300 border py-4.5 px-2 rounded-sm leading-0'>
                  {result?.source || ''}
                </div>
              </Field>
              <Field className="py-3 border-b border-b-gray-200 text-gray-600">
                <Label className="dark:text-gray-300"> Calories Per Serving: </Label>
                <div className='w-ful text-gray-900 bg-gray-100 border-gray-300 border py-4.5 px-2 rounded-sm leading-0'>
                  {result?.calories_per_serving ?? ''}
                </div>
              </Field>          
            </div>
          </div>
          <Field className="py-3 border-b border-b-gray-200 text-gray-600">
            <Label className="dark:text-gray-300"> Total Calories: </Label>
            <div className='w-ful text-gray-900 bg-gray-100 border-gray-300 border py-4.5 px-2 rounded-sm leading-0'>
              {result?.total_calories ?? ''}
            </div>
          </Field>
        </div>
        <div className="py-4">
          <h3 className="text-md text-amber-700 dark:text-amber-300">Macronutrients Per Serving:</h3>
          <div className="grid md:grid-cols-2 gap-4 mt-3">
            <Field className="py-3 border-b border-b-gray-200 text-gray-600">
              <Label className="dark:text-gray-300">  Protein: </Label>
              <div className='w-ful text-gray-900 bg-gray-100 border-gray-300 border py-4.5 px-2 rounded-sm leading-0'>
                {result.macronutrients_per_serving?.protein ?? ''}
             </div>
            </Field>
            <Field className="py-3 border-b border-b-gray-200 text-gray-600">
              <Label className="dark:text-gray-300"> Carbs: </Label>
              <div className='w-ful text-gray-900 bg-gray-100 border-gray-300 border py-4.5 px-2 rounded-sm leading-0'>
                {result.macronutrients_per_serving?.carbohydrates ?? ''}
             </div>
            </Field>
            <Field className="py-3 border-b border-b-gray-200 text-gray-600">
              <Label className="dark:text-gray-300">Saturated Fat: </Label>
              <div className='w-ful text-gray-900 bg-gray-100 border-gray-300 border py-4.5 px-2 rounded-sm leading-0'>
                {result.macronutrients_per_serving?.saturated_fat ?? ''}
             </div>
             {result.macronutrients_per_serving?.fiber && (
               <Field className="py-3 border-b border-b-gray-200 text-gray-600">
                <Label className="dark:text-gray-300">Fiber: </Label>
                <div className='w-ful text-gray-900 bg-gray-100 border-gray-300 border py-4.5 px-2 rounded-sm leading-0'>
                 {result.macronutrients_per_serving?.fiber ?? ''}
              </div>
              </Field>
             )}
            </Field>
            <Field className="py-3 border-b border-b-gray-200 text-gray-600">
              <Label className="dark:text-gray-300"> Sugars: </Label>
              <div className='w-ful text-gray-900 bg-gray-100 border-gray-300 border py-4.5 px-2 rounded-sm leading-0'>
                {result.macronutrients_per_serving?.sugars ?? ''}
             </div>
            </Field>
          </div>
          <Field className="py-3 border-b border-b-gray-200 text-gray-600">
            <Label className="dark:text-gray-300"> Total Fat: </Label>
            <div className='w-ful text-gray-900 bg-gray-100 border-gray-300 border py-4.5 px-2 rounded-sm leading-0'>
              {result.macronutrients_per_serving?.total_fat ?? ''}
             </div>
          </Field>
        </div>
        <div className="py-4">
          <h3 className="text-md text-amber-700 dark:text-amber-300">Total Macronutrients:</h3>
          <div className="grid md:grid-cols-2 gap-4 mt-3">
            <Field className="py-3 border-b border-b-gray-200 text-gray-600">
              <Label className="dark:text-gray-300"> Protein: </Label>
              <div className='w-ful text-gray-900 bg-gray-100 border-gray-300 border py-4.5 px-2 rounded-sm leading-0'>
                {result.total_macronutrients?.protein ?? ''}
             </div>
            </Field>
            <Field className="py-3 border-b border-b-gray-200 text-gray-600">
              <Label className="dark:text-gray-300"> Carbs: </Label>
              <div className='w-ful text-gray-900 bg-gray-100 border-gray-300 border py-4.5 px-2 rounded-sm leading-0'>
                {result.total_macronutrients?.carbohydrates ?? ''}
             </div>
            </Field>
            <Field className="py-3 border-b border-b-gray-200 text-gray-600">
              <Label className="dark:text-gray-300">Saturated Fat: </Label>
              <div className='w-ful text-gray-900 bg-gray-100 border-gray-300 border py-4.5 px-2 rounded-sm leading-0'>
                {result.total_macronutrients?.saturated_fat ?? ''}
             </div>
            </Field>
            {result.total_macronutrients?.fiber && (
              <Field className="py-3 border-b border-b-gray-200 text-gray-600">
                <Label className="dark:text-gray-300">Fiber: </Label>
                <div className='w-ful text-gray-900 bg-gray-100 border-gray-300 border py-4.5 px-2 rounded-sm leading-0'>
                  {result.total_macronutrients?.fiber ?? ''}
               </div>
              </Field>
             )}
            <Field className="py-3 border-b border-b-gray-200 text-gray-600">
              <Label className="dark:text-gray-300">Sugars: </Label>
              <div className='w-ful text-gray-900 bg-gray-100 border-gray-300 border py-4.5 px-2 rounded-sm leading-0'>
                {result.total_macronutrients?.sugars ?? ''}
             </div>
            </Field>
          </div>
          <Field className="py-3 border-b border-b-gray-200 text-gray-600">
            <Label className="dark:text-gray-300"> Total Fat: </Label>
            <div className='w-ful text-gray-900 bg-gray-100 border-gray-300 border py-4.5 px-2 rounded-sm leading-0'>
              {result?.total_macronutrients?.total_fat ?? ''}
            </div>
          </Field>
        </div>
      </CardContent>
    </Card>
  )
};

export default ResultCard;