"use client";

import s from "./CatalogPage.module.css";
import Filters from "@/src/components/catalog/Filters/Filters";

import { useCarsStore } from "@/src/components/store/useCarStore";
import CarList from "@/src/components/catalog/CarList/CarList";

export default function CatalogPage() {
  const {
    cars,
    isLoading,
    hasMore,
    loadInitialCars,
    loadMoreCars,
    filters,
    setFilters,
  } = useCarsStore();

  return (
    <main className={s.screen}>
      <div className="container">
        {/* Фильтры — БЕЗ props */}
        <Filters />

        {/* Листинг работает от store */}
        <CarList />

        {/* {hasMore && !isLoading && (
          <button className={s.loadMore} onClick={loadMoreCars}>
            Load more
          </button>
        )} */}

        {isLoading && <p className={s.loader}>Loading...</p>}
      </div>
    </main>
  );
}
