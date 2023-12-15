// @path: @/app/page.tsx
import Home from "@/components/Home";
import Error from "./error";

export const metadata = {
  title: "HomePage - BookIT",
};

// функція-запит до сервера на отримання списку кімнат
const getRooms = async (searchParams: string) => {
  const urlParams = new URLSearchParams(searchParams);
  const queryString = urlParams.toString();
  // виконання запиту до сервера за допомогою fetch
  const res = await fetch(`${process.env.API_URL}/api/rooms?${queryString}`, {
    cache: "no-cache",
  });
  // повернення результату запиту у форматі JSON
  return res.json();
};

// виконує запит до сервера та відображає компонент Home
export default async function HomePage({searchParams}: {
  searchParams: string;
}) {
  // виклик функції для отримання списку кімнат
  const data = await getRooms(searchParams);

  if (data?.message) {
    return <Error error={data} />;
  }
  // вивід значення кількості кімнат на сторінку
  console.log("resPerPage => ", data.resPerPage);
  // повернення компонента
  return <Home data={data} />;
}
