export enum UserFiedls {
  ID = 'id',
  FIRST_NAME = 'first_name',
  LAST_NAME = 'last_name',
  EMAIL = 'email',
  PASSWORD ='password',
  CONF_PASSWORD = 'conf_password'
};

export enum CalorieFields {
  DISH_NAME = 'dish_name',
  SERVINGS = 'servings'
};

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

export type LoginUser = Omit<User, 'id'>;
export interface AuthResponse {
  token: string;
  user: LoginUser
};

export interface LoginUserError {
  retryAfter: string;
  message: string;
  status: number;
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
  ingredient_breakdown?: IngredientBreakdown[];
};

export interface RateLimitInfo {
  limit: number
  remaining: number
  reset: string
};