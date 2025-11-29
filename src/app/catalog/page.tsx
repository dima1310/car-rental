"use client";

import { useEffect } from "react";
import { useCarsStore } from "@/src/components/store/useCarStore";
import { CarCard } from "@/src/components/catalog/CarCard/CarCards";
import { Filters } from "@/src/components/catalog/Filters/Filters";
import styles from "./CatalogPage.module.css";

export default function CatalogPage() {
  const { cars, loadInitialCars, loadMoreCars, hasMore, isLoading, error } =
    useCarsStore();

  useEffect(() => {
    loadInitialCars();
  }, [loadInitialCars]);

  return (
    <main className={styles.page}>
      <Filters />

      {isLoading && cars.length === 0 && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <ul className={styles.grid}>
        {cars.map((car) => (
          <li key={car.id} className={styles.gridItem}>
            <CarCard car={car} />
          </li>
        ))}
      </ul>

      {hasMore && (
        <div className={styles.loadMoreWrapper}>
          <button
            className={styles.loadMore}
            onClick={loadMoreCars}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </main>
  );
}
