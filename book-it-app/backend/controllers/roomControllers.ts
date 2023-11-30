// @path: @/backend/controllers/roomControllers.ts
// модулі для обробки запитів та відповідей
import { NextRequest, NextResponse } from "next/server";
import Room from "../models/room";

// Get all rooms  =>  /api/rooms
export const allRooms = async (req:NextRequest) => {
  // кількість кімнат на сторінку
  const resPerPage:number = 8;
  // отримуємо всі кімнати з бази даних
  const rooms = await Room.find();

  return NextResponse.json({
    success: true,
    resPerPage,
    rooms,
  });
};

// Create new room  =>  /api/admin/rooms
export const newRoom = async (req:NextRequest) => {
  // отримуємо дані для нової кімнати з запиту
  const body = await req.json();
  // створюємо нову кімнату в базі даних
  const room = await Room.create(body);

  return NextResponse.json({
    success: true,
    room,
  });
};

// Get room details  =>  /api/rooms/:id
export const getRoomDetails = async (
  req:NextRequest, {params}:{params: { id:string }}
) => {
  // знаходимо кімнату за її ідентифікатором
  const room = await Room.findById(params.id);

  if (!room) {
    return NextResponse.json(
      { message: "Room not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    room,
  });
};

// Update room details  =>  /api/admin/rooms/:id
export const updateRoom = async (
  req:NextRequest, {params}:{params: { id:string }}
) => {
  // знаходимо кімнату за її ідентифікатором
  let room = await Room.findById(params.id);
  // отримуємо дані для оновлення кімнати з запиту
  const body = await req.json();

  if (!room) {
    return NextResponse.json(
      { message: "Room not found" },
      { status: 404 }
    );
  }
  // оновлюємо кімнату в базі даних
  room = await Room.findByIdAndUpdate(
    params.id, body, {new: true}
  );

  return NextResponse.json({
    success: true,
    room,
  });
};

// Delete room details  =>  /api/admin/rooms/:id
export const deleteRoom = async (
  req:NextRequest, {params}:{params: { id:string }}
) => {
  // знаходимо кімнату за її ідентифікатором
  const room = await Room.findById(params.id);

  if (!room) {
    return NextResponse.json(
      {
        message: "Room not found",
      },
      { status: 404 }
    );
  }

  // TODO - видалити зображення, пов'язані з кімнатою

  // видаляємо кімнату з бази даних
  await room.deleteOne();

  return NextResponse.json({
    success: true,
  });
};
