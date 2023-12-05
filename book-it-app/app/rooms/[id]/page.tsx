// @path: @/app/rooms/[id]/page.tsx
import Error from "@/app/error";
import RoomDetails from "@/components/room/RoomDetails";
// Інтерфейс для типів властивостей компонента
interface Props {
  params: { id:string };
}

// для отримання даних про кімнату з сервера за допомогою API
const getRoom = async (id:string) => {
  // отримання даних за певним ідентифікатором
  const res = await fetch(`${process.env.API_URL}/api/rooms/${id}`);
  // парсимо отримані дані у форматі JSON та повертаємо результат
  return res.json();
};

// асинхронний компонент для відображення деталей кімнати
export default async function RoomDetailsPage({ params }: Props) {
  // отримуємо інфо із сервера
  const data = await getRoom(params?.id);
  // перевіряємо, чи є повідомлення про помилку
  if (data?.message) {
    return <Error error={data} />;
  }
  // якщо немає помилок, виводимо дані для дебагу
  console.log(data);
  // повертаємо компонент із даними про кімнату
  return <RoomDetails data={data} />;
}

export async function generateMetadata({ params }: Props) {
  const data = await getRoom(params?.id);

  return {
    title: data?.room?.name,
  };
}
