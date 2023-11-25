// @file: /api/posts/route.ts
import { NextResponse } from 'next/server';
import { posts } from './posts'

// обробник запиту GET для отримання постів
export async function GET(req:Request) {
  // отримання параметрів запиту з URL
  const { searchParams } = new URL(req.url)
  // отримання значення параметра 'q' з URL
  const query = searchParams.get('q');
  // копіювання всіх постів для подальшої фільтрації
  let currentPosts = posts;
  // якщо присутній пошуковий запит ('q' в URL), 
  if (query) {
    // фільтруємо пости за вказаним запитом
    currentPosts = posts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
  }
  // повертаємо відфільтровані пости у форматі JSON
  return NextResponse.json(currentPosts);
}

// обробник запиту POST для обробки переданих даних
export async function POST(req:Request) {
  // отримання тіла запиту у форматі JSON
  const body = await req.json()
  // виведення отриманих даних у консоль (для демонстрації)
  console.log(body);
  // повертаємо дані у форматі JSON як відповідь на POST-запит
  return NextResponse.json({ body })
}