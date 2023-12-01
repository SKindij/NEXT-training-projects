// @path: @/backend/controllers/roomControllers.ts
// модулі для обробки запитів та відповідей
import { NextRequest, NextResponse } from "next/server";
import Room from "../models/room";
import ErrorHandler from "../utils/errorHandler";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";

// @desc: Get all rooms  
// @route: GET /api/rooms
// @access: Public
export const allRooms = catchAsyncErrors(async (req:NextRequest) => {
  // кількість кімнат на сторінку
  const resPerPage:number = 8;
  // отримуємо всі кімнати з бази даних
  const rooms = await Room.find();

  return NextResponse.json({
    success: true,
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
