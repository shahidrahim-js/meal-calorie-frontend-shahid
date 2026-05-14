import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import {ThemeProvider} from "next-themes";
import {Toaster} from 'sonner';
import "./globals.css";
import { instrumentSerif } from "@/lib/fonts";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meal Calorie Count Generator",
  description: "Your all-in-one solution for tracking meals, calories, and exercise. The Meal Calorie Count Generator makes healthy living simple, helping you stay motivated and achieve lasting fitness results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider enableSystem
          attribute='class'
          defaultTheme='system'>
          <Header />
          <main className="max-w-dvw block box-border pt-24 px-5 xl:px-16 min-h-dvh relative">
            {children}
          </main>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
};
