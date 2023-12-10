// @path: app/[chapterId]/book.context.tsx
import { createContext, useContext } from 'react';
import { BookRunner } from '../lib/runner/runner';
import { Module } from '../lib/builder/types';

// Створюємо контекст для книги
const BookContext = createContext<BookRunner<string>>(
  null as unknown as BookRunner<string>
);

// встановлює значення контексту на основі модуля
export function BookContextProvider({
  children,
  module,
}: WithChildren<{ module: Module<string> }>) {
  // новий екземпляр BookRunner для використання в контексті
  const bookRunner = new BookRunner(module);
  // Передаємо значення BookRunner у контекст для всіх нащадків компонента
  return (
    <BookContext.Provider value={bookRunner}>{children}</BookContext.Provider>
  );
}

// Хук, який дозволяє легко отримати доступ до значення BookRunner з контексту
export const useBook = () => useContext(BookContext);