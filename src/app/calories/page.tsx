"use client"

import React from 'react';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { useMealStore } from '@/stores/mealStore';
import ResultCard from '@/components/ResultCard';
import MealForm from '@/components/MealForm';

function CaloriesPage() {
  useAuthGuard()
  const result = useMealStore((state) => state.lastResult);

  return (
    <div className="container py-10 flex items-center flex-col">
      <MealForm />
      {result && (
        <div className="mt-8 w-full sm:max-w-lg">
          <ResultCard result={result} />
        </div>
      )}
    </div>
  );
};

export default CaloriesPage;
