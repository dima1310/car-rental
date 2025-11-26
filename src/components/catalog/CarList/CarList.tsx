"use client";

import { useEffect } from "react";
import { useCarsStore } from "@/src/components/store/useCarStore";
import { CarCard } from "@/src/components/catalog/CarCard/CarCards";

export default function CarList() {
  const { cars, isLoading, error, hasMore, loadInitialCars, loadMoreCars } =
    useCarsStore();

  // 🔥 загрузка при первом рендере

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (isLoading && cars.length === 0) {
    return <p>Loading cars...</p>;
  }

  if (!isLoading && cars.length === 0) {
    return <p>No cars found</p>;
  }

  return (
    <>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {cars.map((car) => (
          <li key={car.id}>
            <CarCard car={car} />
          </li>
        ))}
      </ul>

      {hasMore && (
        <div style={{ marginTop: "32px", textAlign: "center" }}>
          <button
            onClick={loadMoreCars}
            disabled={isLoading}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
}
