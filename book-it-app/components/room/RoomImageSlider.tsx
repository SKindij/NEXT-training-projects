// @path: @/components/room/RoomImageSlider.tsx
import { IImage } from "@/backend/models/room";
import Image from "next/image";
import React from "react";
import { Carousel } from "react-bootstrap";
// Інтерфейс для типів властивостей компонента
interface Props {
  images: IImage[];
}

// компонент для відображення слайдера зображень кімнати
const RoomImageSlider = ({ images }: Props) => {
  return (
    <Carousel> 
      {images?.length > 0 ? (
        // якщо є зображення, виводимо кожне з них як окремий слайд
        images?.map((image) => (
          <Carousel.Item key={image?.public_id}>
            <div style={{ width: "100%", height: "460px" }}>
              <Image
                className="d-block m-auto"
                src={image?.url}
                alt={image?.url}
                layout="fill"
              />
            </div>
          </Carousel.Item>
        ))
      ) : (
        <Carousel.Item>
          <div style={{ widows: "100%", height: "460px" }}>
            <Image
              className="d-block m-auto"
              src={"/images/default_room_image.jpg"}
              alt={"/images/default_room_image.jpg"}
              layout="fill"
            />
          </div>
        </Carousel.Item>
      )}
    </Carousel>
  );
};

export default RoomImageSlider;
