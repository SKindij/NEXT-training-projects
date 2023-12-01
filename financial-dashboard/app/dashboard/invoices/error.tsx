'use client';
// @file: /app/dashboard/invoices/error.tsx
import { useEffect } from 'react';

// компонент приймає об'єкт з помилкою та функцією reset
export default function Error({ error, reset }: {
  error: Error & { digest?:string };
  reset: () => void;
}) {
  useEffect( () => {
    // виводимо об'єкт помилки у консоль для відстеження проблем
    console.error(error);
  }, [error] );
 
  return (
    // основний контейнер з централізованим розташуванням елементів
    <main className="flex h-full flex-col items-center justify-center">
      {/* заголовок помилки */}
	  <h2 className="text-center">Something went wrong!</h2>
      {/* кнопка для спроби знову викликати функцію reset */}
	  <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // обробник подій для кнопки, який викликає функцію reset
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}