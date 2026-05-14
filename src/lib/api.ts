import { useAuthStore } from "@/stores/authStore";
import { AuthResponse, CalorieResponse } from "@/types";
import { LoginFormValues, MealInput, RegisterFormValues } from "./validations";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token = useAuthStore.getState().token;

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...(options?.headers || {}),
    },
  });

  if (res.status === 403) {
    useAuthStore.getState().logout();

    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    };

    throw new Error("Session expired");
  };

  const data = await res.json();

  if (!res.ok) {
    throw {
      status: res.status,
      message: data.message,
      retryAfter: data.retryAfter
    }
  };
  return data;
};

export const registerUser = (body: RegisterFormValues): Promise<AuthResponse> => (
  apiFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(body),
  })
);

export const loginUser = (body: LoginFormValues): Promise<AuthResponse> => (
  apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(body),
  })
);

export const getCalories = (body: MealInput): Promise<CalorieResponse> => (
  apiFetch('/api/get-calories', {
    method: 'POST',
    body: JSON.stringify(body),
  })
);