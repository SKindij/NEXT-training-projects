// @path: app/[chapterId]/client.layout.tsx
'use client';

import { Module } from '../lib/builder/types';
import { BookContextProvider } from './book.context';

// використовує контекст книги BookContextProvider
export function ClientLayout({
  children, module,
}: WithChildren<{ module: Module<string> }>) {
  return <BookContextProvider module={module}>{children}</BookContextProvider>;
}