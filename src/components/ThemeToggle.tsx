"use client"

import React, {useCallback} from 'react';
import {useTheme} from 'next-themes';
import {Button} from '@/components/ui/button';
import {Moon, Sun} from 'lucide-react';

function ThemeToggle() {
  const {setTheme, theme} = useTheme();

  const hadleClick = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [setTheme, theme]);

  return (
    <Button variant='outline'
      size='icon'
      onClick={hadleClick}
      className='cursor-pointer'>
      <Sun className='h-5 w-5 rotate-0 scale-100 dark:-rotate-90 dark:scale-0' />
      <Moon className='h-5 w-5 rotate-90 scale-0 dark:rotate-0 dark:scale-100 absolute' />
    </Button>
  )
}

export default ThemeToggle;
