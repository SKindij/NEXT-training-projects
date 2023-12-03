// @path: @/app/page.tsx
import Home from "@/components/Home";

// export const dynamic = "force-dynamic";
// функція-запит до сервера на отримання списку кімнат
const getRooms = async () => {
  // виконання запиту до сервера за допомогою fetch
  const res = await fetch("http://localhost:3000/api/rooms", {
    // опції запиту next.js
    next: {
      tags: ["Rooms"],
    },
  });
  // повернення результату запиту у форматі JSON
  return res.json();
};

// виконує запит до сервера та відображає компонент Home
export default async function HomePage() {
  // виклик функції для отримання списку кімнат
  const rooms = await getRooms();
  // вивід значення кількості кімнат на сторінку
  console.log("resPerPage => ", rooms.resPerPage);
  // повернення компонента
  return <Home />;
}
