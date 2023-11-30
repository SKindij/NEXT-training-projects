// @path: @/app/api/admin/rooms/route.ts
// функція з'єднання з базою даних
import dbConnect from "@/backend/config/dbConnect";
// функція створення нової кімнати
import { newRoom } from "@/backend/controllers/roomControllers";
// функція створення маршрутизатора
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";
// Інтерфейс для контексту запиту
interface RequestContext {}
// створення маршрутизатора
const router = createEdgeRouter<NextRequest, RequestContext>();
// виклик функції з'єднання з базою даних
dbConnect();
// налаштування маршруту POST для створення нової кімнати
router.post(newRoom);
// виклик маршрутизатора для обробки запиту
export async function POST(request:NextRequest, ctx:RequestContext) {
  return router.run(request, ctx);
}
