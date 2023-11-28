// @file: /app/dashboard/invoices/page.tsx
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
// отримуємо кількість сторінок із рахунками
import { fetchInvoicesPages } from '@/app/lib/data';

// відповідає за відображення сторінки з рахунками
export default async function Page( {searchParams}: {
  searchParams?: {
    query?:string;
    page?:string;
  };
} ) {
  // отримуємо параметри пошуку або встановлюємо значення за замовчуванням
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  // отримуємо кількість сторінок для пагінації з бази даних
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
	  {/* Заголовок сторінки */}
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
	  {/* Рядок з пошуком та кнопкою для створення нового рахунку */}
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
	  {/* відображення скелета таблиці під час завантаження */}
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        {/* таблиця з рахунками (параметри пошуку та номер поточної сторінки) */}
		<Table query={query} currentPage={currentPage} />
      </Suspense>
	  {/* Відображення компоненту пагінації */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
