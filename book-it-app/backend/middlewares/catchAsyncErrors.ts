// @path: @/backend/middlewares/catchAsyncErrors.ts
import { NextRequest, NextResponse } from "next/server";
// тип для функції-обробника запиту
type HandlerFunction = (req:NextRequest, params:any) => Promise<NextResponse>;
// інтерфейс для об'єкта валідаційної помилки
interface IValidationError {
  // поле для збереження повідомлення про помилку
  message:string;
}

// функція перехоплення асинхронних помилок у маршрутах
export const catchAsyncErrors =
  (handler:HandlerFunction) => async (req:NextRequest, params:any) => {
    try {
      // виклик функції-обробника запиту
      return await handler(req, params);
    // обробка помилок на основі їх типів
    } catch (error:any) {
      // якщо є помилка приведення типів (наприклад, ID невірного формату)
      if (error?.name === "CastError") {
        error.message = `Resource not found. Invalid ${error?.path}`;
        error.statusCode = 400;
      }
      // якщо є помилка валідації (наприклад, неправильні дані в запиті)
      if (error?.name === "ValidationError") {
        // отримання всіх повідомлень про помилки валідації
        error.message = Object.values<IValidationError>(error.errors).map(
          (value) => value.message
        );
        error.statusCode = 400;
      }
      // об'єкт відповіді з повідомленням про помилку та статус-кодом
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: error.statusCode || 500 }
      );
    }
};
