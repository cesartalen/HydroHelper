import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { Header } from '@/components/ui/header';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          {session ? (
          <>
            <div className='max-w-xl mx-auto xl:max-w-4xl md:max-w-3xl'>
              <Header/>
              {children}
            </div>
          </>
          ) : (
            <>
              {children}
            </>
          )
          }
        </body>
      </html>
    </SessionProvider>
  );
}
