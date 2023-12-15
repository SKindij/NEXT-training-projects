// @path: @/components/Home.tsx
import React from "react";
import RoomItem from "./room/RoomItem";
// інтерфейс IRoom для типізації даних
import { IRoom } from "@/backend/models/room";

import CustomPagination from "./layout/CustomPagination";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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

  const searchParams = useSearchParams();
  const location = searchParams.get("location");

  return (
    <div>
      {/* секція зі списком кімнат */}
      <section id="rooms" className="container mt-5">
        {/* заголовок секції. */}
        <h2 className="mb-3 ml-2 stays-heading">
          {location
            ? `${rooms?.length} rooms found in ${location}`
            : "All Rooms"
          }
        </h2>
        {/* посилання для повернення до сторінки пошуку */}
        <Link href="/search" className="ml-2 back-to-search">
          <i className="fa fa-arrow-left me-1"></i> Back to Search
        </Link>
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

      <CustomPagination
        resPerPage={resPerPage}
        filteredRoomsCount={filteredRoomsCount}
      />
    </div>
  );
};

export default Home;
