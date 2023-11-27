// @path: @/backend/config/dbConnect.ts
// бібліотека для роботи з MongoDB
import mongoose from "mongoose";

// функція для з'єднання з базою даних
const dbConnect = async () => {
  // перевірка стану з'єднання,
  if (mongoose.connection.readyState >= 1) {
    // якщо вже підключено, повертаємось
    return;
  }
  // для зберігання рядка підключення до бази даних
  let DB_URI:string = "";
  // вибір URL бази даних в залежності від середовища виконання
  if (process.env.NODE_ENV === "development") DB_URI = process.env.DB_LOCAL_URI!;
  if (process.env.NODE_ENV === "production") DB_URI = process.env.DB_URI!;
  // виконання підключення до бази даних MongoDB
  await mongoose.connect(DB_URI).then( (conect) => console.log('DB connected!') );
};

export default dbConnect;