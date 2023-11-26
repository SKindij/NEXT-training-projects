// @file: /app/profile/page.tsx
// конфігурація автентифікації
import { authConfig } from "../../configs/auth";
// для отримання сесії на сервері
import { getServerSession } from "next-auth/next";
// автоматично оптимізує зображення для швидкості завантаження
import Image from 'next/image';

// відображає профіль користувача
export default async function Profile() {
  // отримання сесії користувача на сервері
  const session = await getServerSession(authConfig);

  return (
    <div>
      {/* відображення імені користувача */}
      <h1>Profile of {session?.user?.name}</h1>
      {/* відображення зображення користувача */}
      {session?.user?.image && (
        <Image src={session.user.image} alt="" width={300} height={300} />
      )}
    </div>
  );
}
