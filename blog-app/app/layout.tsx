// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
  const inter = Inter({ subsets: ['latin'] });

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'Next Blog App',
  description: 'Blog App by create next app',
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className='container'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
