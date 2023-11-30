// @path: @/backend/controllers/roomControllers.ts
// модулі для обробки запитів та відповідей
import { NextRequest, NextResponse } from "next/server";
import Room from "../models/room";

// @desc: Get all rooms  
// @route: GET /api/rooms
// @access: Public
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

// @desc: Create new room 
// @route: POST /api/admin/rooms
// @access: Admin
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

// @desc: Get room details  
// @route: GET /api/rooms/:id
// @access: Public
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

// @desc: Update room details
// @route: PUT /api/admin/rooms/:id
// @access: Admin
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

// @desc: Delete room details
// @route: DELETE /api/admin/rooms/:id
// @access: Admin
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
