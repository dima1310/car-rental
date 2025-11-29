"use client";

import Link from "next/link";
import type { Car } from "@/src/components/types/car";
import { useCarsStore } from "@/src/components/store/useCarStore";
import { formatMileage } from "@/src/components/utils/formatMileage";
import styles from "./CarCard.module.css";

interface Props {
  car: Car;
}

export const CarCard: React.FC<Props> = ({ car }) => {
  const { favorites, toggleFavorite } = useCarsStore();
  const isFavorite = favorites.includes(car.id);

  return (
    <article className={styles.card}>
      {/* IMAGE */}
      <div className={styles.imageWrapper}>
        <img
          src={car.img}
          alt={`${car.make} ${car.model}`}
          className={styles.image}
        />

        <button
          type="button"
          className={`${styles.favorite} ${
            isFavorite ? styles.favoriteActive : ""
          }`}
          onClick={() => toggleFavorite(car.id)}
          aria-label="Add to favorites"
        />
      </div>

      {/* CONTENT */}
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>
            {car.make} <span>{car.model}</span>, {car.year}
          </h3>
          <span className={styles.price}>{car.rentalPrice}</span>
        </div>

        <p className={styles.meta}>
          {car.city} | {car.country} | {car.type} | {formatMileage(car.mileage)}
        </p>

        <Link href={`/catalog/${car.id}`} className={styles.button}>
          Read more
        </Link>
      </div>
    </article>
  );
};
