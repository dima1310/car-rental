"use client";

import Link from "next/link";
import Image from "next/image";
import type { Car } from "@/src/components/types/car";
import { useCarsStore } from "@/src/components/store/useCarStore";
import { formatMileage } from "@/src/components/utils/formatMileage";
import css from "./CarCard.module.css";

interface Props {
  car: Car;
}

export const CarCard: React.FC<Props> = ({ car }) => {
  const { favorites, toggleFavorite } = useCarsStore();
  const liked = favorites.includes(car.id);

  const address = car.address ?? "";
  const [city = "", rawCountry = ""] = address.split(",");
  const country = rawCountry.trim();

  return (
    <article className={css.cardRoot}>
      {/* IMAGE */}
      <div className={css.topImageBox}>
        <Link href={`/catalog/${car.id}`}>
          <Image
            src={car.img}
            alt={`${car.make} ${car.model}`}
            fill
            className={css.carPhoto}
            sizes="(max-width: 768px) 100vw, 274px"
          />
        </Link>

        <button
          type="button"
          className={`${css.favToggle} ${liked ? css.favOn : ""}`}
          onClick={() => toggleFavorite(car.id)}
          aria-label={liked ? "Remove from favorites" : "Add to favorites"}
        >
          <Image
            src={liked ? "/icons/heart-blue.svg" : "/icons/heart.svg"}
            alt="favorite"
            width={20}
            height={20}
          />
        </button>
      </div>

      {/* TITLE + PRICE */}
      <div className={css.titleRow}>
        <Link href={`/catalog/${car.id}`} className={css.titleLink}>
          <h3 className={css.mainTitle}>
            {car.make} <span className={css.modelAccent}>{car.model}</span>,{" "}
            <span className={css.yearText}>{car.year}</span>
          </h3>
        </Link>

        <span className={css.priceText}>{car.rentalPrice}</span>
      </div>

      {/* ADDRESS */}
      <div className={css.metaLine}>
        <span>{city.trim()}</span>
        <span>{country}</span>
      </div>

      {/* MILEAGE */}
      <div className={css.metaLine}>
        <span>{formatMileage(car.mileage)} km</span>
      </div>

      <Link href={`/catalog/${car.id}`} className={css.detailsBtn}>
        Read more
      </Link>
    </article>
  );
};
