"use client"

import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from "lucide-react";
import { RegisterFormValues, registerSchema } from '@/lib/validations';
import { registerUser } from '@/lib/api';
import { UserFiedls} from '@/types';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function RegisterPage() {
  const [confPassword, setConfPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    getValues
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema)
  });
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const token = useAuthStore((state) => state.token);
  
  useEffect(() => {
    if(token) {
        router.replace('/dashboard');
      }
  }, [token, router]);
  
  const isPasswordNotMatch =
    confPassword.length > 0 &&
    getValues('password') !== confPassword;
    
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event?.target || {};
    if(name === UserFiedls.CONF_PASSWORD) {
      setConfPassword(value);
    }
  }, []);

  async function onSubmit(values: RegisterFormValues) {
    if(isPasswordNotMatch) {
      return;
    }
    try {
      const data = await registerUser(values);
      setAuth(data.token, data.user);
      toast.success("Account created successfull");
      router.push("/dashboard");
    } catch (err: unknown) {
      toast.error(err?.message || "Registration failed");
    }
  }

  return (
    <>
      <div className='flex items-center justify-center min-h-[85vh] pb-5'>
        <Card className='bg-white w-full md:w-1/3 rounded-2xl flex justify-center flex-col py-5 shadow-md'>
          <CardHeader className="border-b border-b-gray-300">
            <CardDescription>Create Account to start tracking meal calories</CardDescription>
            <CardTitle className="text-2xl dark:text-gray-900">Register Now</CardTitle>
          </CardHeader>
          <CardContent>
            <form className='w-full px-5 flex gap-3 flex-col text-gray-600' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input className='w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 border-gray-300 border py-2 px-2 rounded-md leading-0'
                {...register(UserFiedls.FIRST_NAME)}
                placeholder='First Name' />
                {errors.first_name && <span className='text-red-400 text-xs'>{errors.first_name.message}</span>}
            </div>
            <div>
                <input className='w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 border-gray-300 border py-2 px-2 rounded-md leading-0'
                  {...register(UserFiedls.LAST_NAME)}
                  placeholder='Last Name' />
                  {errors.last_name && <span className='text-red-400 text-xs'>{errors.last_name.message}</span>}
            </div>
            <div>
                <input className='w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 border-gray-300 border py-2 px-2 rounded-md leading-0'
                  {...register(UserFiedls.EMAIL)}
                  placeholder='Email' />
                {errors.email && <span className='text-red-400 text-xs'>{errors.email.message}</span>}
            </div>
            <div>
              <div className='relative'>
                <input className='w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 
                  border-gray-300 border py-2 px-2 rounded-md'
                  {...register(UserFiedls.PASSWORD)}
                  type={showPassword ? "text" : "password"}
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
            <div>
              <input className='w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 border-gray-300 border py-2 px-2 rounded-md'
                type="password"
                name={UserFiedls.CONF_PASSWORD}
                placeholder='Confirm Password'
                value={confPassword}
                onChange={handleChange} />
                {isPasswordNotMatch && <span className='text-red-400 text-xs'>{'Passwords do not match'}</span>}
            </div>
            <div className='w-full'>
              <Button type="submit"
                disabled={isSubmitting}
                className='w-full cursor-pointer text-white bg-red-800 hover:bg-red-900 transition-all py-5'>
                Register {isSubmitting ? <Spinner data-icon="inline-start" /> : ''}
              </Button >
            </div>
            <div>
              <Link href='/login' className='text-gray-800'>Already have an account?
                {' '}
                <span className='text-blue-600 cursor-pointer underline hover:text-blue-800 transition-all'>
                  Login
                </span>
              </Link>
            </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default RegisterPage;