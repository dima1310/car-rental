"use client";

import styles from "./CarDetails.module.css";
import type { Car } from "@/src/components/types/car";
import { formatMileage } from "@/src/components/utils/formatMileage";

interface Props {
  car: Car;
}

export const CarDetails = ({ car }: Props) => {
  /* ===== ADDRESS ===== */
  const address = car.address ?? "";
  const [city = "", rawCountry = ""] = address.split(",");
  const country = rawCountry.trim();

  /* ===== RENTAL CONDITIONS (string | string[]) ===== */
  const rentalConditions: string[] = Array.isArray(car.rentalConditions)
    ? car.rentalConditions
    : typeof car.rentalConditions === "string"
    ? car.rentalConditions
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  /* ===== ACCESSORIES ===== */
  const accessories: string[] = Array.isArray(car.accessories)
    ? car.accessories
    : [];

  /* ===== FUNCTIONALITIES ===== */
  const functionalities: string[] = Array.isArray(car.functionalities)
    ? car.functionalities
    : [];

  return (
    <section className={styles.card}>
      {/* TITLE */}
      <h1 className={styles.title}>
        {car.make} {car.model}, {car.year}
      </h1>

      {/* INFO */}
      <div className={styles.infoRow}>
        <span>ID: {car.id}</span>
        <span>
          {city}
          {country ? `, ${country}` : ""}
        </span>
        <span>Mileage: {formatMileage(car.mileage)} km</span>
      </div>

      {/* PRICE */}
      <p className={styles.priceTag}>${car.rentalPrice}</p>

      {/* DESCRIPTION */}
      <p className={styles.textBody}>{car.description}</p>

      {/* RENTAL CONDITIONS */}
      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Rental Conditions</h3>
        <ul className={styles.listReset}>
          {rentalConditions.map((item, idx) => (
            <li key={idx} className={styles.listItem}>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* SPECIFICATIONS */}
      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Specifications</h3>
        <ul className={styles.listReset}>
          <li className={styles.listItem}>Year: {car.year}</li>
          <li className={styles.listItem}>
            Fuel consumption: {car.fuelConsumption}
          </li>
          <li className={styles.listItem}>Engine size: {car.engineSize}</li>
        </ul>
      </section>

      {/* ACCESSORIES */}
      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Accessories</h3>
        <ul className={styles.listReset}>
          {accessories.map((acc, idx) => (
            <li key={idx} className={styles.listItem}>
              {acc}
            </li>
          ))}
        </ul>
      </section>

      {/* FUNCTIONALITIES */}
      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Functionalities</h3>
        <ul className={styles.listReset}>
          {functionalities.map((fn, idx) => (
            <li key={idx} className={styles.listItem}>
              {fn}
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};
