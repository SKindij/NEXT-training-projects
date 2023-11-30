// @path: @/app/api/rooms/[id]/route.ts
import dbConnect from "@/backend/config/dbConnect";
import { getRoomDetails, updateRoom } from "@/backend/controllers/roomControllers";
// функціонал створення маршруту
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";
// типи для визначення контексту
interface RequestContext {
  params: {
    id:string;
  };
}

// створюємо роутер через next-connect для обробки запитів
const router = createEdgeRouter<NextRequest, RequestContext>();
// встановлюємо з'єднання з базою даних перед обробкою запитів
dbConnect();
// налаштовуємо обробку запиту для отримання деталей кімнати за її ідентифікатором
router.get(getRoomDetails);

// функція, яка буде обробляти GET-запити до цього маршруту
export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
