// @file: /app/api/posts/[id]/route.ts
import { NextResponse } from 'next/server'
import { headers, cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// обробник DELETE-запиту для видалення конкретного поста
export async function DELETE(req:Request, { params }:{ params: { id:string } }) {
  // отримання id поста з параметрів запиту
  const id = params.id
  // отримання заголовків запиту
  const headerList = headers();
  // отримання значення заголовка 'Content-Type'
  const type = headerList.get('Content-Type');
  // отримання cookies з запиту
  const cookiesList = cookies();
  // отримання значення cookie з іменем 'Cookie_2'
  const coo2 = cookiesList.get('Cookie_2')?.value
  // логіка для видалення поста з використанням id

  // перенаправлення на сторінку '/blog'
  // redirect('/blog')
  return NextResponse.json({ id, type, coo2 });
}