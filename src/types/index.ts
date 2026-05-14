export enum UserFiedls {
  ID = 'id',
  FIRST_NAME = 'first_name',
  LAST_NAME = 'last_name',
  EMAIL = 'email',
  PASSWORD ='password',
  CONF_PASSWORD = 'conf_password'
}

export interface RegisterFormType {
  [UserFiedls.FIRST_NAME]: string;
  [UserFiedls.LAST_NAME]: string;
  [UserFiedls.EMAIL]: string;
  [UserFiedls.PASSWORD]: string;
  [UserFiedls.CONF_PASSWORD]: string;
};

export interface LoginFormType {
  [UserFiedls.EMAIL]: string;
  [UserFiedls.PASSWORD]: string;
};

export interface User {
  [UserFiedls.ID]: string;
  [UserFiedls.FIRST_NAME]: string;
  [UserFiedls.LAST_NAME]: string;
  [UserFiedls.EMAIL]: string;
};

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
};

export interface Macronutrients {
  protein?: number
  total_fat?: number
  carbohydrates?: number
  fiber?: number
  sugars?: number
  saturated_fat?: number
};

export interface IngredientBreakdown {
  name: string;
  calories_per_100g: number;
  macronutrients_per_100g: Macronutrients;
  serving_size: string;
  data_type: string;
  fdc_id: number;
  brand: string;
};

export interface CalorieResponse {
  dish_name: string
  servings: number
  calories_per_serving: number
  total_calories: number
  source: string
  macronutrients_per_serving?: Macronutrients
  total_macronutrients?: Macronutrients;
  ingredient_breakdown?: IngredientBreakdown;
}

export interface RateLimitInfo {
  limit: number
  remaining: number
  reset: string
};