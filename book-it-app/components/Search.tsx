// @path: @/components/Search.tsx
"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// Цей компонент відповідає за форму пошуку номерів
const Search = () => {
  // Стан для зберігання введення користувача для різних полів пошуку
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState("");
  const [category, setCategory] = useState("");
  // Отримання інстанції маршрутизатора Next.js
  const router = useRouter();
  // Функція-обробник подання форми пошуку
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Створення рядка запиту на основі введення користувача
    const queryString = [
      location && `location=${encodeURIComponent(location)}`,
      guests && `guestCapacity=${encodeURIComponent(guests)}`,
      category && `category=${encodeURIComponent(category)}`,
    ]
      .filter(Boolean)
      .join("&");
    // Перенаправлення користувача на URL з параметрами пошуку
    router.push(`/?${queryString}`);
  };

  return (
    <div className="row wrapper mt-5">
      <div className="col-10 col-lg-5">
        <form className="shadow rounded" onSubmit={submitHandler}>
          <h2 className="mb-3">Search Rooms</h2>
          {/* Поле для введення місця розташування */}
          <div className="form-group mt-3">
            <label htmlFor="location_field" className="mb-1">
              {" "}
              Location{" "}
            </label>
            <input type="text"
              className="form-control"
              id="location_field" value={location}
              placeholder="new york"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          {/* Поле для вибору кількості гостей */}
          <div className="form-group mt-3">
            <label htmlFor="guest_field" className="mb-1">
              {" "}
              No. of Guests{" "}
            </label>
            <select className="form-select"
              id="guest_field" value={guests}
              onChange={(e) => setGuests(e.target.value)}
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          {/* Поле для вибору типу кімнати */}
          <div className="form-group mt-3">
            <label htmlFor="room_type_field" className="mb-1">
              {" "}
              Room Type{" "}
            </label>
            <select className="form-select"
              id="room_type_field" value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {["King", "Single", "Twins"].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          {/* Кнопка для відправки форми пошуку */}
          <button type="submit" className="btn form-btn w-100 py-2">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;