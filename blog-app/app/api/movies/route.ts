// @file: /app/api/movies/route.ts
import { NextResponse } from 'next/server';

// обробник GET-запиту для отримання списку фільмів
export async function GET(req:Request) {
  // отримання API ключа з оточення
  const API_KEY = process.env.OMDB_SECRET;
  // запит за фільмами "matrix" (може бути параметром запиту)
  const query = 'matrix';
  // виконання запиту до зовнішнього API (OMDb)
  const movies = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
  ).then(res => res.json())
  // дані про фільми у форматі JSON як відповідь на GET-запит
  return NextResponse.json(movies)
}