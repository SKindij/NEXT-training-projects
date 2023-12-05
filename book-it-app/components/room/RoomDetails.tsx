"use client";
// @path: @/components/room/RoomDetails.tsx
import { IRoom } from "@/backend/models/room";
import React from "react";
import StarRatings from "react-star-ratings";
import RoomImageSlider from "./RoomImageSlider";
import RoomFeatures from "./RoomFeatures";
import BookingDatePicker from "./BookingDatePicker";
import ListReviews from "../review/ListReviews";
import NewReview from "../review/NewReview";
// Інтерфейс для типів властивостей компонента
interface Props {
  data: {
    room: IRoom;
  };
}

// компонент для відображення деталей кімнати
const RoomDetails = ({ data }: Props) => {
  // розпаковуємо дані про кімнату з властивостей data
  const { room } = data;

  return (
    <div className="container container-fluid">
      {/* назва та адреса кімнати. */}
      <h2 className="mt-5">{room.name}</h2>
      <p>{room.address}</p>
      {/* рейтинг та кількість відгуків */}
      <div className="ratings mt-auto mb-3">
        <StarRatings
          rating={room?.ratings} name="rating"
          starRatedColor="#e61e4d" numberOfStars={5}
          starDimension="22px" starSpacing="1px"
        />
        <span className="no-of-reviews">({room?.numOfReviews} Reviews)</span>
      </div>
      {/* слайдер зображень кімнати */}
      <RoomImageSlider images={room?.images} />
      {/* опис та особливості кімнати */}
      <div className="row my-5">
        <div className="col-12 col-md-6 col-lg-8">
          <h3>Description</h3>
          <p>{room?.description}</p>
          <RoomFeatures room={room} />
        </div>
        {/* блок для вибору дат бронювання та мапи кімнати */}
        <div className="col-12 col-md-6 col-lg-4">
          <BookingDatePicker room={room} />
          // Room Map - TODO
        </div>
      </div>
      {/* компонент для додавання нового відгуку */}
      <NewReview />
      {/* компонент для відображення списку відгуків */}
      <ListReviews />
    </div>
  );
};

export default RoomDetails;
