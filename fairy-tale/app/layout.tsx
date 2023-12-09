// @path: @/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// Імпорт глобальних стилів
import './globals.css';
import { AppText } from './shared/typography/app-text';
import { AppNav } from './nav';

// Ініціалізація шрифту Inter з підмножиною "latin"
const inter = Inter({ subsets: ['latin'] });

// Метадані сторінки
export const metadata: Metadata = {
  title: 'Чарівна казка',
  description: 'Чарівна казка на Святого Миколая',
};

// функція, що створює загальний шаблон сторінки
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ua-UK">
      <body className={inter.className}>
        {/* Відображення компонента навігації */}
        <AppNav />
        <main>
          {/* Вміст сторінки */}
          {children}
        </main>
      </body>
    </html>
  );
}