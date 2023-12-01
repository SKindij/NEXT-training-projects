// @path: @backend/models/room.ts
import mongoose, { Schema, Document } from "mongoose";
/*
 Document - використовується для представлення документів, збережених у базі даних.
 Кожен документ в колекції MongoDB може бути представлений об'єктом, який реалізує інтерфейс Document.

 Schema - це клас, який дозволяє визначати структуру документа для колекції в MongoDB.
 Визначення схеми допомагає встановити, як дані мають зберігатися та виводитися.
*/

// Інтерфейс для зображень кімнати
export interface IImage extends Document {
  public_id:string;
  url:string;
}
// Інтерфейс для відгуків про кімнату
export interface IReview extends Document {
  user:mongoose.Schema.Types.ObjectId;
  rating:number;
  comment:string;
}
/*
 Використовуючи extends Document, ми позначаємо, що цей інтерфейс
 буде представляти документ, який може бути збережений в MongoDB.
 TypeScript розуміє, що цей інтерфейс може містити додаткові методи та властивості Mongoose для роботи. 
 Наприклад, методи для збереження документа в базі даних, оновлення, видалення тощо.
*/

// Інтерфейс для розташування кімнати
export interface ILocation {
  type:string;
  coordinates:number[];
  formattedAddress:string;
  city:string;
  state:string;
  zipCode:string;
  country:string;
}

// Інтерфейс для об'єкту кімнати
export interface IRoom extends Document {
  name:string;
  description:string;
  pricePerNight:number;
  address:string;
  location:ILocation;
  guestCapacity:number;
  numOfBeds:number;
  isInternet:boolean;
  isBreakfast:boolean;
  isAirConditioned:boolean;
  isPetsAllowed:boolean;
  isRoomCleaning:boolean;
  ratings:number;
  numOfReviews:number;
  images:IImage[];
  category:string;
  reviews:IReview[];
  user:mongoose.Schema.Types.ObjectId;
  createdAt:Date;
}

// Схема для кімнати
const roomSchema:Schema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter room name"],
    trim: true,
    maxLength: [100, "Room name cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter room description"],
  },
  pricePerNight: {
    type: Number,
    required: [true, "Please enter room price per night"],
    default: 0.0,
  },
  address: {
    type: String,
    required: [true, "Please enter room address"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  guestCapacity: {
    type: Number,
    required: [true, "Please enter room guest capacity"],
  },
  numOfBeds: {
    type: Number,
    required: [true, "Please enter number of beds in room"],
  },
  isInternet: {
    type: Boolean,
    default: false,
  },
  isBreakfast: {
    type: Boolean,
    default: false,
  },
  isAirConditioned: {
    type: Boolean,
    default: false,
  },
  isPetsAllowed: {
    type: Boolean,
    default: false,
  },
  isRoomCleaning: {
    type: Boolean,
    default: false,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter room category"],
    enum: {
      values: ["King", "Single", "Twins"],
      message: "Please select correct category for room",
    },
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Експортуємо модель кімнати
export default mongoose.models["Room"] ||
  mongoose.model<IRoom>("Room", roomSchema);

/* нотатки
 required: [true, "Please enter room name"],
  - вказує, що це поле є обов'язковим для заповнення
  - інакше генерується помилка з повідомленням 
 maxLength: [100, "Room name cannot exceed 100 characters"],
  - вказує на максимальну довжину для рядка в полі
  - інакше генерується помилка з повідомленням
 default: 0.0, 
  - встановлює значення за замовчуванням для поля
 enum: ["Point"],
  - обмеження вказує, що поле може приймати лише значення, перераховані у масиві
 index: "2dsphere",
  - встановлює індекс для полів, яке представляє географічні дані у форматі GeoJSON
  - це поле може бути використане для запитів географічних даних
 user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  - вказує, що user є посиланням (ObjectId) на об'єкт із колекції "User"
*/
