import { create } from "zustand";
import { persist } from "zustand/middleware";
import { carsApi, type CarsFilters } from "@/src/components/services/carsApi";
import type { Car } from "@/src/components/types/car";

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
      // ===== STATE =====
      cars: [],
      filters: {},
      favorites: [],
      page: 1,
      limit: 12,
      hasMore: true,
      isLoading: false,
      error: null,

      // ===== ACTIONS =====

      setFilters: async (filters) => {
        set({
          filters,
          cars: [],
          page: 1,
          hasMore: true,
        });

        await get().loadInitialCars();
      },

      loadInitialCars: async () => {
        try {
          set({ isLoading: true, error: null });

          const { filters, limit } = get();
          const data = await carsApi.getCars(filters); // ✅ всегда массив

          set({
            cars: data.slice(0, limit),
            page: 1,
            hasMore: data.length > limit,
          });
        } catch (error: any) {
          set({ error: error.message ?? "Failed to load cars" });
        } finally {
          set({ isLoading: false });
        }
      },

      loadMoreCars: async () => {
        const { page, limit, filters, cars, hasMore, isLoading } = get();
        if (!hasMore || isLoading) return;

        try {
          set({ isLoading: true, error: null });

          const data = await carsApi.getCars(filters);

          const start = page * limit;
          const nextCars = data.slice(start, start + limit);

          set({
            cars: [...cars, ...nextCars],
            page: page + 1,
            hasMore: data.length > start + limit,
          });
        } catch (error: any) {
          set({ error: error.message ?? "Failed to load more cars" });
        } finally {
          set({ isLoading: false });
        }
      },

      toggleFavorite: (id) => {
        const { favorites } = get();

        set({
          favorites: favorites.includes(id)
            ? favorites.filter((fid) => fid !== id)
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
