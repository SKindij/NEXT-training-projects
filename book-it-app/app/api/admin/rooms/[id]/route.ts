// @path: @/app/api/admin/rooms/[id]/route.ts
// модулі та функції для взаємодії з базою даних та обробки запитів
import dbConnect from "@/backend/config/dbConnect";
import { deleteRoom, updateRoom } from "@/backend/controllers/roomControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

// очікуваний формат об'єкта контексту, що містить параметр id
interface RequestContext {
  params: {
    id:string;
  };
}
// маршрутизатор для обробки PUT та DELETE запитів з параметром id
const router = createEdgeRouter<NextRequest, RequestContext>();
// підключення до бази даних перед роботою з запитами
dbConnect();
// додаємо функції обробки запитів до маршрутизатора
router.put(updateRoom);
router.delete(deleteRoom);

// викликає виконання маршрутизатора з вхідними параметрами
export async function PUT(request:NextRequest, ctx:RequestContext) {
  return router.run(request, ctx);
}

// викликає виконання маршрутизатора з вхідними параметрами
export async function DELETE(request:NextRequest, ctx:RequestContext) {
  return router.run(request, ctx);
}
