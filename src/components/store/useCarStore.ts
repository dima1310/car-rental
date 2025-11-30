import { create } from "zustand";
import { persist } from "zustand/middleware";
import { carsApi } from "@/src/components/services/carsApi";
import type { CarsFilters, Car } from "@/src/components/types/car";

interface CarsState {
  cars: Car[];
  filters: CarsFilters;
  favorites: string[];
  page: number;
  limit: number;
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;

  setFilters: (filters: CarsFilters) => Promise<void>;
  loadInitialCars: () => Promise<void>;
  loadMoreCars: () => Promise<void>;
  toggleFavorite: (id: string) => void;
}

export const useCarsStore = create<CarsState>()(
  persist(
    (set, get) => ({
      cars: [],
      filters: {},
      favorites: [],
      page: 1,
      limit: 12,
      hasMore: false,
      isLoading: false,
      error: null,

      // === APPLY FILTERS ===
      setFilters: async (filters) => {
        set({
          filters,
          cars: [],
          page: 1,
          hasMore: false,
        });

        await get().loadInitialCars();
      },

      // === LOAD INITIAL ===
      loadInitialCars: async () => {
        try {
          set({ isLoading: true, error: null });

          const { filters, limit } = get();
          const received = await carsApi.getCars(filters);

          const safe = Array.isArray(received) ? received : [];

          set({
            cars: safe,
            page: 1,
            hasMore: safe.length === limit,
          });
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "Failed to load cars";

          set({ error: message });
        } finally {
          set({ isLoading: false });
        }
      },

      // === LOAD MORE ===
      loadMoreCars: async () => {
        const { filters, limit, cars, hasMore, isLoading } = get();

        if (!hasMore || isLoading) return;

        try {
          set({ isLoading: true, error: null });

          const received = await carsApi.getCars(filters);
          const safe = Array.isArray(received) ? received : [];

          set({
            cars: [...cars, ...safe],
            hasMore: safe.length === limit,
          });
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "Failed to load more cars";

          set({ error: message });
        } finally {
          set({ isLoading: false });
        }
      },

      // === FAVORITES ===
      toggleFavorite: (id) => {
        const { favorites } = get();

        set({
          favorites: favorites.includes(id)
            ? favorites.filter((item) => item !== id)
            : [...favorites, id],
        });
      },
    }),
    {
      name: "car-rental-store",
      partialize: (state) => ({
        favorites: state.favorites,
      }),
    }
  )
);
