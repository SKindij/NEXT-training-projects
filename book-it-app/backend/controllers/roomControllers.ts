// @path: @/backend/controllers/roomControllers.ts
// модулі для обробки запитів та відповідей
import { NextRequest, NextResponse } from "next/server";
// функція, що отримує інформацію про всі кімнати
export const allRooms = async (req:NextRequest) => {
  // повертає відповідь у форматі JSON
  return NextResponse.json({
    testSource: "from /backend/controllers/roomControllers",
    testData: "info about all rooms"
  });
};
