// app/blog/page.tsx
import { Metadata } from "next";
import Link from "next/link";

async function getData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: {
      revalidate: 60, // дані будуть кешовані на 60 секунд
    },
  });
  // обробка помилки, якщо запит на сервер не вдалось виконати
    if (!response.ok) throw new Error("Unable to fetch posts!");
  // розпакування JSON-відповіді в об'єкт
    return response.json();
}

// визначення метаданих сторінки
  export const metadata:Metadata = {
    title: "Blog | Next App",
  };

export default async function Blog() {
  // викликаємо для отримання списку постів
  const posts = await getData();

  return (
    <>
      <h1>Blog page</h1>
      <ul>
        {posts.map((post:any) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
