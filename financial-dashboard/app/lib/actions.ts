'use server';
// @path: @/app/lib/actions.ts
// для визначення схеми об'єкта форми та валідації її даних
import { z } from 'zod';
// для роботи з базою даних PostgreSQL
import { sql } from '@vercel/postgres';
// для оновлення кешу після змін в базі даних
import { revalidatePath } from 'next/cache';
// для перенаправлення на потрібну сторінку
import { redirect } from 'next/navigation';

// визначення схеми форми за допомогою zod
const FormSchema = z.object( {
  id: z.string(),
  customerId: z.string(),
  // забезпечує перетворення значення на число
  amount: z.coerce.number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  // перевірка, що значення є одним із заданих переліком
  status: z.enum(['pending', 'paid']), {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
} );
// визначення окремої схеми для створення рахунку, виключаючи id і date
const CreateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

// додає дані щодо нового рахунку в базу даних
export async function createInvoice(prevState:State, formData:FormData) {
  // витягуємо необхідні дані з форми та валідуємо їх
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  }); 
  // перевіряємо наявність помилок при валідації
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
  // витягуємо дані після валідації
  const { customerId, amount, status } = validatedFields.data;
  // переводимо суму рахунку з доларів в центи
  const amountInCents = amount * 100;
  // отримуємо поточну дату у форматі ISO та відділяємо час від дати
  const date = new Date().toISOString().split('T')[0];
  // test it out:
  console.log(`amountInCents: ${amountInCents} on ${date}.`);
  try {
    // використовуємо sql-запит для вставки нового рахунку в базу даних
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
  
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// визначення схеми для оновлення рахунку, виключаючи id і date
const UpdateInvoice = FormSchema.omit({ id:true, date:true });

export async function updateInvoice(id:string, formData:FormData) {
  // витягуємо необхідні дані з форми та валідуємо їх
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  // переводимо суму рахунку з доларів в центи
  const amountInCents = amount * 100;
  try {
    // використовуємо sql-запит для оновлення в базу даних
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
  // для перевалідації шляху та перенаправлення на потрібну сторінку
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}


export async function deleteInvoice(id:string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    // ініціює новий запит на сервер і повторно відтворить таблицю
    revalidatePath('/dashboard/invoices');
	return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }	
}
