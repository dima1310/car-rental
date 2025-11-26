"use client";

import Link from "next/link";
import type { Car } from "@/src/components/types/car";
import { useCarsStore } from "@/src/components/store/useCarStore";
import { formatMileage } from "@/src/components/utils/formatMileage";

interface Props {
  car: Car;
}

export const CarCard: React.FC<Props> = ({ car }) => {
  const { favorites, toggleFavorite } = useCarsStore();
  const isFavorite = favorites.includes(car.id);

  // Лог ID (нужен для проверки)
  console.log("ID IN CARD:", car.id);

  return (
    <article>
      <img
        src={car.img}
        alt={`${car.make} ${car.model}`}
        width={300}
        height={200}
        style={{ objectFit: "cover" }}
      />

      <h2>
        {car.make} {car.model}, {car.year}
      </h2>

      <p>Price: {car.rentalPrice}</p>
      <p>Mileage: {formatMileage(car.mileage)}</p>

      <button type="button" onClick={() => toggleFavorite(car.id)}>
        {isFavorite ? "Remove from favorites" : "Add to favorites"}
      </button>

      <Link href={`/catalog/${car.id}`}>
        <button type="button">Read more</button>
      </Link>
    </article>
  );
};
