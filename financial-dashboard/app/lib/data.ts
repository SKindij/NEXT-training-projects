// @file: /app/lib/data.ts
import { unstable_noStore as noStore } from 'next/cache';
// функція дозволяє робити запити до бази даних
import { sql } from '@vercel/postgres';
import {
  CustomerField, CustomersTable, InvoiceForm,
  InvoicesTable, LatestInvoiceRaw, User, Revenue,
} from './definitions';
import { formatCurrency } from './utils';

// інфо з бази: доходи по місяцях
export async function fetchRevenue() {
  // this prevent response from being cached
  noStore();
  // equivalent to in fetch(..., {cache: 'no-store'})
  try {
    console.log('Fetching Revenue data...');
	await new Promise((resolve) => setTimeout(resolve, 2500));
    const data = await sql<Revenue>`SELECT * FROM revenue`;
	console.log('Data fetch completed after 3 seconds.');
    console.log(data.rows.length); // => 12
	
    // об'єкт type Revenue[місяць, дохід]
    return data.rows;
	
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

// інфо з бази: останні 5 рахунків
export async function fetchLatestInvoices() {
  noStore();
  try {
    console.log('Fetching Latest Invoices data...');
    // SQL-запит з бази даних
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;
    // обробка отриманих даних
    const latestInvoices = data.rows.map((invoice) => ({
	  // функція обробляє кожен рахунок у відповіді
      ...invoice,
	  // для форматування суми рахунку
      amount: formatCurrency(invoice.amount),
    }));
	// відформатований масив останніх рахунків
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

// інфо з бази: статистика по рахунках та клієнтах
export async function fetchCardData() {
  noStore();
  try {
    console.log('Fetching Cards Data...');
    // різні SQL-запити
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;
    // виконання запитів паралельно
    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);
	console.log('* Promise.all done!');
    // обробка отриманих даних
    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');
    // повертається об'єкт зі статистикою
    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

// кількість елементів на сторінці для пагінації
const ITEMS_PER_PAGE = 6;
// асинхронна функція, яка витягує відфільтровані рахунки з бази даних
export async function fetchFilteredInvoices(
  query:string, // умова пошуку
  currentPage:number, // поточна сторінка для пагінації
) {
  // вимикаємо кешування результатів запиту
  noStore();
  // визначаємо зміщення для вибірки сторінки результатів
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    // виконуємо SQL-запит для витягування відфільтрованих рахунків
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    // повертаємо рядки результатів запиту
    return invoices.rows;
  } catch (error) {
    // логуємо помилку бази даних та кидаємо новий виняток
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

// приймає умови пошуку та повертає кількість сторінок для пагінації
export async function fetchInvoicesPages(query:string) {
  // вимикаємо кешування результатів запиту
  noStore();
  try {
    // SQL-запит для отримання кількості рахунків, які відповідають пошуку
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;
    // обчислюємо загальну кількість сторінок
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    // логуємо помилку бази даних та кидаємо новий виняток
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

// приймає id рахунку та повертає відповідний рахунок
export async function fetchInvoiceById(id: string) {
  // вимикаємо кешування результатів запиту
  noStore();
  try {
     // виконуємо SQL-запит для отримання рахунку за його id
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;
    // мапимо отримані дані...
    const invoice = data.rows.map( (invoice) => ({
      ...invoice,
      // та конвертуємо суму з центів у долари
      amount: invoice.amount / 100,
    }) );
    // перший елемент масиву (зазвичай, це єдиний рахунок з вказаним id)
    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

// отримує всіх клієнтів з бази даних
export async function fetchCustomers() {
  try {
    // отримання всіх клієнтів, відсортованих за іменем
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;
    // масив клієнтів, отриманих з бази даних
    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

//
export async function fetchFilteredCustomers(query: string) {
  noStore();
  try {
    const data = await sql<CustomersTable>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
