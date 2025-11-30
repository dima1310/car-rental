"use client";

import Image from "next/image";
import styles from "./CarDetails.module.css";
import type { Car } from "@/src/components/types/car";
import { formatMileage } from "@/src/components/utils/formatMileage";

interface Props {
  car: Car;
}

export const CarDetails = ({ car }: Props) => {
  /* ===== ADDRESS ===== */
  const [city = "", rawCountry = ""] = (car.address ?? "").split(",");
  const country = rawCountry.trim();

  /* ===== NORMALIZE DATA ===== */

  const rentalConditions: string[] = Array.isArray(car.rentalConditions)
    ? car.rentalConditions
    : typeof car.rentalConditions === "string"
    ? car.rentalConditions
        .split("\n")
        .map((i) => i.trim())
        .filter(Boolean)
    : [];

  const accessories: string[] = Array.isArray(car.accessories)
    ? car.accessories
    : [];

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
      <p className={styles.price}>${car.rentalPrice}</p>

      {/* DESCRIPTION */}
      <p className={styles.description}>{car.description}</p>

      {/* RENTAL CONDITIONS */}
      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Rental Conditions</h3>
        <ul className={styles.list}>
          {rentalConditions.map((item, idx) => (
            <li key={`${item}-${idx}`} className={styles.item}>
              <Image src="/icons/check.svg" alt="" width={16} height={16} />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* SPECIFICATIONS */}
      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Car Specifications</h3>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Image src="/icons/calendar.svg" alt="" width={16} height={16} />
            Year: {car.year}
          </li>
          <li className={styles.item}>
            <Image src="/icons/car.svg" alt="" width={16} height={16} />
            Type: {car.type}
          </li>
          <li className={styles.item}>
            <Image src="/icons/fuel.svg" alt="" width={16} height={16} />
            Fuel Consumption: {car.fuelConsumption}
          </li>
          <li className={styles.item}>
            <Image src="/icons/engine.svg" alt="" width={16} height={16} />
            Engine Size: {car.engineSize}
          </li>
        </ul>
      </section>

      {/* ACCESSORIES */}
      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Accessories</h3>
        <ul className={styles.list}>
          {accessories.map((acc, idx) => (
            <li key={`${acc}-${idx}`} className={styles.item}>
              <Image
                src="/icons/check-circle.svg"
                alt=""
                width={16}
                height={16}
              />
              {acc}
            </li>
          ))}
        </ul>
      </section>

      {/* FUNCTIONALITIES */}
      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Functionalities</h3>
        <ul className={styles.list}>
          {functionalities.map((fn, idx) => (
            <li key={`${fn}-${idx}`} className={styles.item}>
              <Image
                src="/icons/check-circle.svg"
                alt=""
                width={16}
                height={16}
              />
              {fn}
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};
