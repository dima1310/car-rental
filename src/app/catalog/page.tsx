"use client";

import { useEffect } from "react";
import { useCarsStore } from "@/src/components/store/useCarStore";
import { CarCard } from "@/src/components/catalog/CarCard/CarCards";
import { Filters } from "@/src/components/catalog/Filters/Filters";

export default function CatalogPage() {
  const { cars, loadInitialCars, loadMoreCars, hasMore, isLoading, error } =
    useCarsStore();

  useEffect(() => {
    // початкове завантаження
    loadInitialCars();
  }, [loadInitialCars]);

  return (
    <main>
      <h1>Catalog</h1>

      <Filters />

      {isLoading && cars.length === 0 && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div>
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {hasMore && (
        <button type="button" onClick={loadMoreCars} disabled={isLoading}>
          {isLoading ? "Loading..." : "Load More"}
        </button>
      )}
    </main>
  );
}
