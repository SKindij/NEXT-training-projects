// @path: @/backend/utils/errorHandler.ts
// використовується для створення об'єктів помилок з певним статус-кодом
class ErrorHandler extends Error {
  // поле для збереження статус-коду помилки
  statusCode:number;
  // конструктор приймає повідомлення про помилку та статус-код
  constructor(errMessage:string, statusCode:number) {
    // виклик конструктора Error з повідомленням про помилку
    super(errMessage);
    // ініціалізація коду для даної помилки
    this.statusCode = statusCode;
  }
}

export default ErrorHandler;
