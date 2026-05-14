"use client"

import React from 'react';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { useAuthStore } from '@/stores/authStore';
import { useMealStore } from '@/stores/mealStore';
import { UserFiedls } from '@/types';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { instrumentSerif } from '@/lib/fonts';

function DashboardPage() {
  useAuthGuard();
  const user = useAuthStore((state) => state.user);
  const history = useMealStore((state) => state.history);

  return (
    <>
    <div className='conatiner py-3.5  mb-5'>
      <h1 className={`text-3xl font-bold text-amber-500 dark:text-amber-400 ${instrumentSerif.className}`}>
        Welcome,
        {" "}
        <span className={`bg-red-200 text-red-950 px-1 py-0.5 ${instrumentSerif.className}`}>
          {user?.[UserFiedls.FIRST_NAME]} {user?.[UserFiedls.LAST_NAME]}
        </span>
      </h1>
    </div>
    <Card className="w-full sm:max-w-l px-5 mb-5 max-h-[70vh] min-h-[60vh]">
      <CardHeader className="border-b border-b-gray-300">
        <CardTitle className="text-2xl">Meal History Log</CardTitle>
      </CardHeader>
     <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">Dish Name</TableHead>
          <TableHead>Servings</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Calories Per Serving</TableHead>
          <TableHead className="text-right">Total Calories</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {history?.map((item) => (
          <TableRow key={`${item.dish_name}-${item.servings}`}>
            <TableCell className="font-medium">{item.dish_name}</TableCell>
            <TableCell>{item.servings}</TableCell>
            <TableCell>{item.source}</TableCell>
            <TableCell>{item.calories_per_serving}</TableCell>
            <TableCell className="text-right">{item.total_calories}</TableCell>
          </TableRow>
        ))}
      </TableBody>
     </Table>
    </Card>
    </>
  )
};

export default DashboardPage;
