// @path: @/api/rooms/route.ts
//модуль обробки HTTP-запитів у серверній частині
import { NextRequest } from "next/server";
// функція-контролер для отримання інфо про кімнати
import { allRooms } from "@/backend/controllers/roomControllers";
// використовується для створення роутерів
import { createEdgeRouter } from "next-connect";
// підключення до бази даних
import dbConnect from "@/backend/config/dbConnect";

// інтерфейс для контексту запиту
interface RequestContext {
  params: {
    id:string;
  };
}
// створення роутера з параметрами
const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

// додавання обробника запиту для методу GET у роутер
router.get(allRooms);
// обробник запиту GET для маршруту "/api/rooms"
export async function GET(request:NextRequest, ctx:RequestContext) {
  // викликає метод run роутера з параметрами запиту та контексту
  return router.run(request, ctx);
}
