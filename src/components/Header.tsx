"use client"

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { useAuthStore } from '@/stores/authStore';
import { Button } from './ui/button';
import { LogOut, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const {token, user, logout} = useAuthStore();

  const isAuthenticated = !!token;

  const navLinks = [
    {
      href: "/dashboard",
      label: "Dashboard",
    },
    {
      href: "/calories",
      label: "Calories",
    },
  ];

  function handleLogout() {
    logout();
    router.replace('/login');
  }

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur transition-all bg-amber-50 dark:border-b-indigo-900
     dark:bg-indigo-950 flex items-center justify-between shadow-accent-foreground border-b-2 border-amber-400">
      <div className="flex h-16 items-center justify-between pl-10">
        <Link href='/' className=''>
        <Image src="/meal-calorie-count-generator-logo.svg"
          alt="Meal Calorie"
          loading="lazy"
          width={120}
          height={120} />
        </Link>
      </div>
      {/* Desktop Navigation */}
      <nav className="hidden sm:block max-w-dvw px-6 sm:px-8 lg:px-16 py-1 sm:py-2">
        <div className='grid grid-flow-col'>
        {
          isAuthenticated ? (
            <>
              <div className='col-start-8 col-end-8 flex items-center justify-center gap-1'>
                {
                  navLinks.map((link) => (
                    <div key={link.href} className='px-2'>
                      <Link
                        href={link.href}
                        className={`text-gray-600 dark:text-gray-50 text-sm mx-2 sm:mx-4 capitalize tracking-wide
                          hover:text-red-800 transition-all dark:hover:text-amber-300 
                            ${
                          pathname === link.href
                            ? "font-semibold text-red-800 border-b-red-800"
                            : "text-gray-600"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </div>
                  ))
                }
              </div>
              <div className="col-start-10 col-end-12 font-medium flex justify-between items-center">
                <ThemeToggle />
                <div className="text-sm px-5">
                  <p className="font-medium">
                    {user?.first_name || 'Shahid'} {user?.last_name || 'rahim'}
                  </p>
                  <p className="text-muted-foreground">
                    {user?.email || 'shahid@gmail.com'}
                  </p>
                </div>
                <Button
                  className='cursor-pointer'
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
              </>
          ) : (
            <div className="col-start-10 col-end-12 font-medium flex justify-end items-center">
              <div className='px-5'><ThemeToggle /></div>
              <Link href='/' className="text-black-600 mx-2 sm:mx-4 capitalize tracking-wide 
                    hover:text-red-800 dark:hover:text-amber-300 transition-all">
                    Home
                  </Link>
              {
                pathname !== '/login' && (
                  <Link href='/login' className="text-black-600 mx-2 sm:mx-4 capitalize tracking-wide 
                    hover:text-red-800 dark:hover:text-amber-300 transition-all">
                    Login
                  </Link>
                )
              }
              {
                pathname !== '/register' && (
                  <Link href='/register' className="font-medium tracking-wide py-2 px-5 sm:px-8 border border-red-800 
                    dark:border-amber-300 dark:hover:border-amber-400 hover:border-amber-400 text-red-800 
                    dark:text-amber-300 bg-white-500 outline-none rounded-l-full rounded-r-full capitalize 
                    hover:bg-amber-300 dark:hover:bg-amber-400 hover:text-red-950 dark:hover:text-red-950
                    transition-all">
                    Register
                  </Link>
                )
              }
            </div>
          )
        }
        </div>
      </nav>
      {/* Mobile Navigation */}
        <div className="flex items-center gap-3 md:hidden px-5">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="mt-10 flex flex-col gap-6 px-5">
                {isAuthenticated ? (
                  <>
                    <div className="space-y-1 border-b pb-4">
                      <p className="font-medium">
                        {user?.first_name} {user?.last_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`text-base ${
                          pathname === link.href
                            ? "font-semibold text-primary"
                            : ""
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Button
                      variant="destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <div className='text-center border-b-gray-300 border-b pb-3 hover:text-red-800'>
                       <Link href="/">
                          Home
                      </Link>
                    </div>
                    <Button asChild variant="outline" className='dark:bg-gray-200 dark:text-red-800'>
                      <Link href="/login">
                        Login
                      </Link>
                    </Button>
                    <Button asChild className='bg-amber-400 text-red-900'>
                      <Link href="/register">
                        Register
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
    </header>
  )
}

export default Header;
