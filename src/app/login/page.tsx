"use client"

import React, { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {toast} from 'sonner';
import Link from 'next/link';
import {useRouter} from 'next/navigation'
import {useAuthStore} from '@/stores/authStore';
import { UserFiedls } from '@/types';
import {LoginFormValues, loginSchema} from '@/lib/validations';
import { loginUser } from '@/lib/api';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const token = useAuthStore((state) => state.token);

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting}
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  });
  
    useEffect(() => {
      if(token) {
        router.replace('/dashboard');
      }
    }, [token, router]);

  async function onSubmit(values: LoginFormValues) {
    try {
      const data = await loginUser(values);
      setAuth(data.token, data.user);
      toast.success("Login successfull");
      router.push("/dashboard");
    } catch (err: unknown) {
      toast.error(err?.message || "Login failed");
    }
  }

  return (
    <div className='flex items-center justify-center h-screen max-h-[85vh]'>
      <Card className='bg-white w-full md:w-1/3 rounded-2xl flex justify-center flex-col py-5 shadow-md'>
        <CardHeader className="border-b border-b-gray-300">
          <CardDescription>Welcome back.</CardDescription>
          <CardTitle className="text-2xl">Log In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}
            className='w-full px-5 flex gap-3 flex-col text-gray-600'
          >
            <div>
          <input className='w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 
          border-gray-300 border py-2 px-2 rounded-md leading-0'
            {...register(UserFiedls.EMAIL)}
            type='email'
            placeholder='Email' />
            {errors.email && <span className='text-red-400 text-xs'>{errors.email.message}</span>}
            </div>
            <div>
          <div className='relative'>
            <input className='w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 
             border-gray-300 border py-2 px-2 rounded-md'
              {...register(UserFiedls.PASSWORD)}
              type={showPassword ? 'text' : 'password'}
              placeholder='Password' />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
            </div>
            {errors.password && <span className='text-red-400 text-xs'>{errors.password.message}</span>}
            </div>
            <div className='w-full'>
              <Button type="submit"
                disabled={isSubmitting}
                className='w-full cursor-pointer text-white bg-red-800 hover:bg-red-900 transition-all py-5'>
                  Login {isSubmitting ? <Spinner data-icon="inline-start" /> : ''}
              </Button >
            </div>
            <div>
              <Link href='/register' className='text-gray-800'>Don't have an account?
                {' '}
                <span className='text-blue-600 cursor-pointer underline hover:text-blue-800 transition-all'>
                  Register
                </span>
              </Link>
            </div>
          </form>
      </CardContent>
    </Card>
  </div>
  );
};

export default LoginPage;
