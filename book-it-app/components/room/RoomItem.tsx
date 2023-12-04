// @path: @/components/room/RoomItem.tsx
import { IRoom } from "@/backend/models/room";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import StarRatings from "react-star-ratings";

// інтерфейс для типів властивостей компонента
interface Props {
  room: IRoom;
}

// компонент, який відображає інформацію про окрему кімнату
const RoomItem = ({ room }: Props) => {
  return (
    // обгортка для карточки кімнати, яка відображається в гріді
    <div className="col-sm-12 col-md-6 col-lg-3 my-3 d-flex">
      {/* карточка кімнати на блочній ділянці */}
      <div className="card p-2 w-100">
        {/* зображення кімнати */}
        <Image className="card-img-top mx-auto"
          src={
            room?.images?.length > 0
              ? room.images[0].url
              : "/images/default_room_image.jpg"
          }
          alt={room?.name}
          height={170} width={100}
        />
        {/* інформація про кімнату */}
        <div className="card-body d-flex flex-column">
          {/* заголовок із посиланням на сторінку кімнати */}
          <h5 className="card-title">
            <Link href={`/rooms/${room?._id}`}>{room?.name}</Link>
          </h5>
          {/* ціна за ніч. */}
          <div className="mt-auto">
            <p className="card-text mt-2">
              <b>${room?.pricePerNight}</b> / night
            </p>
          </div>
          {/* інфо про рейтинг та кількість відгуків */}
          <div>
            <div className="d-flex">
              {/* відображення рейтингу у вигляді зірок */}
              <StarRatings name="rating"
                rating={room?.ratings} numberOfStars={5}
                starRatedColor="#e61e4d"
                starDimension="18px" starSpacing="1px"
              />
              {/* кількість відгуків */}
              <span className="no-of-reviews">
                ({room?.numOfReviews} Reviews)
              </span>
            </div>
            {/* кнопка переходу на сторінку з деталями кімнати */}
            <Link className="btn view-btn mt-3 w-100"
              href={`/rooms/${room?._id}`}
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomItem;
