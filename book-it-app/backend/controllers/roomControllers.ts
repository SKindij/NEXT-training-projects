// @path: @/backend/controllers/roomControllers.ts
// модулі для обробки запитів та відповідей
import { NextRequest, NextResponse } from "next/server";
import Room, { IRoom } from "../models/room";
import ErrorHandler from "../utils/errorHandler";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import APIFilters from "../utils/apiFilters";

// @desc: Get all rooms  
// @route: GET /api/rooms
// @access: Public
export const allRooms = catchAsyncErrors(async (req:NextRequest) => {
  // кількість кімнат на сторінку
  const resPerPage:number = 4;
  // параметри пошуку з URL-адреси запиту
  const { searchParams } = new URL(req.url);
  // об'єкт для зберігання параметрів пошуку
  const queryStr:any = {};
  // проходження по всім параметрам пошуку та їх збереження
  searchParams.forEach((value, key) => {
    queryStr[key] = value;
  });
  // отримання загальної кількості кімнат у базі даних
  const roomsCount:number = await Room.countDocuments();
  // інстанціювання об'єкта для фільтрації кімнат
  const apiFilters = new APIFilters(Room, queryStr).search().filter();
  // отримання першої порції кімнат відповідно до вказаних фільтрів
  let rooms:IRoom[] = await apiFilters.query;
  // отримання кількості кімнат після фільтрації
  const filteredRoomsCount:number = rooms.length;
  // застосування пагінації до отриманих кімнат
  apiFilters.pagination(resPerPage);
  // клонування фільтрованого запиту для отримання сторінок кімнат
  rooms = await apiFilters.query.clone();

  return NextResponse.json({
    success: true,
    roomsCount,
    filteredRoomsCount,
    resPerPage,
    rooms,
  });
});

// @desc: Create new room 
// @route: POST /api/admin/rooms
// @access: Admin
export const newRoom = catchAsyncErrors(async (req:NextRequest) => {
  // отримуємо дані для нової кімнати з запиту
  const body = await req.json();
  // створюємо нову кімнату в базі даних
  const room = await Room.create(body);

  return NextResponse.json({
    success: true,
    room,
  });
});

// @desc: Get room details  
// @route: GET /api/rooms/:id
// @access: Public
export const getRoomDetails = catchAsyncErrors(async (
  req:NextRequest, {params}:{params: { id:string }}
) => {
  // знаходимо кімнату за її ідентифікатором
  const room = await Room.findById(params.id);

  if (!room) {
    throw new ErrorHandler("Room not found", 404);
  }

  return NextResponse.json({
    success: true,
    room,
  });
});

// @desc: Update room details
// @route: PUT /api/admin/rooms/:id
// @access: Admin
export const updateRoom = catchAsyncErrors(async (
  req:NextRequest, {params}:{params: { id:string }}
) => {
  // знаходимо кімнату за її ідентифікатором
  let room = await Room.findById(params.id);
  // отримуємо дані для оновлення кімнати з запиту
  const body = await req.json();

  if (!room) {
    throw new ErrorHandler("Room not found", 404);
  }
  // оновлюємо кімнату в базі даних
  room = await Room.findByIdAndUpdate(
    params.id, body, {new: true}
  );

  return NextResponse.json({
    success: true,
    room,
  });
});

// @desc: Delete room details
// @route: DELETE /api/admin/rooms/:id
// @access: Admin
export const deleteRoom = catchAsyncErrors(async (
  req:NextRequest, {params}:{params: { id:string }}
) => {
  // знаходимо кімнату за її ідентифікатором
  const room = await Room.findById(params.id);

  if (!room) {
    throw new ErrorHandler("Room not found", 404);
  }

  // TODO - видалити зображення, пов'язані з кімнатою

  // видаляємо кімнату з бази даних
  await room.deleteOne();

  return NextResponse.json({
    success: true,
  });
});
