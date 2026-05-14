"use client"

import { create } from "zustand";
import { CalorieResponse } from "@/types";

interface MealState {
  lastResult: CalorieResponse | null;
  history: CalorieResponse[];
  setResult: (result: CalorieResponse) => void;
}

export const useMealStore = create<MealState>((set) => ({
  lastResult: null,
  history: [],

  setResult: (result) =>
    set((state) => ({
      lastResult: result,
      history: [result, ...state.history],
    })),
}));