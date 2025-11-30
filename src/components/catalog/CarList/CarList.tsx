"use client";

import { useEffect } from "react";
import { useCarsStore } from "@/src/components/store/useCarStore";
import { CarCard } from "@/src/components/catalog/CarCard/CarCards";
import styles from "./CarList.module.css";

export default function CarList() {
  const { cars, isLoading, error, hasMore, loadInitialCars, loadMoreCars } =
    useCarsStore();

  useEffect(() => {
    loadInitialCars();
  }, [loadInitialCars]);

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (isLoading && cars.length === 0) {
    return <p className={styles.status}>Loading cars...</p>;
  }

  if (!isLoading && cars.length === 0) {
    return <p className={styles.status}>No cars found</p>;
  }

  return (
    <>
      <ul className={styles.list}>
        {cars.map((car) => (
          <li key={car.id} className={styles.item}>
            <CarCard car={car} />
          </li>
        ))}
      </ul>

      {hasMore && (
        <div className={styles.loadMoreWrapper}>
          <button
            onClick={loadMoreCars}
            disabled={isLoading}
            className={styles.loadMoreButton}
          >
            {isLoading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </>
  );
}
