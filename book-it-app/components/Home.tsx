// @path: @/components/Home.tsx
import React from "react";
import RoomItem from "./room/RoomItem";
// інтерфейс IRoom для типізації даних
import { IRoom } from "@/backend/models/room";
// Інтерфейс для типів властивостей компонента
interface Props {
  data: {
    success:boolean;
    resPerPage:number;
    filteredRoomsCount:number;
    rooms:IRoom[];
  };
}
// компонент, який відображає список всіх кімнат на домашній сторінці
const Home = ({ data }: Props) => {
  // розпаковуємо дані з об'єкта props
  const { rooms, resPerPage, filteredRoomsCount } = data;
  return (
    <div>
      {/* секція зі списком кімнат */}
      <section id="rooms" className="container mt-5">
        {/* заголовок секції. */}
        <h2 className="mb-3 ml-2 stays-heading">All Rooms</h2>
        {/* посилання для повернення до сторінки пошуку */}
        <a href="/search" className="ml-2 back-to-search">
          <i className="fa fa-arrow-left"></i> Back to Search
        </a>
        {/* для відображення кімнат */}
        <div className="row mt-4">
          {rooms?.length === 0 ? (
            <div className="alert alert-danger mt-5 w-100">
              <b>No Rooms.</b>
            </div>
          ) : (
            rooms?.map((room) => <RoomItem key={room._id} room={room} />)
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
