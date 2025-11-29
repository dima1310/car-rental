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
      hasMore: false,
      isLoading: false,
      error: null,

      // ===== ACTIONS =====

      // ✅ Установка фильтров (сброс каталога)
      setFilters: async (filters) => {
        set({
          filters,
          cars: [],
          page: 1,
          hasMore: false,
        });

        await get().loadInitialCars();
      },

      // ✅ Первая загрузка
      loadInitialCars: async () => {
        try {
          set({ isLoading: true, error: null });

          const { filters, limit } = get();
          const data = await carsApi.getCars(filters);

          set({
            cars: data,
            page: 1,
            // ✅ если сервер дал limit элементов — показываем кнопку
            hasMore: data.length === limit,
          });
        } catch (error: any) {
          set({
            error: error?.message ?? "Failed to load cars",
          });
        } finally {
          set({ isLoading: false });
        }
      },

      // ✅ Load more
      loadMoreCars: async () => {
        const { filters, limit, cars, hasMore, isLoading } = get();
        if (!hasMore || isLoading) return;

        try {
          set({ isLoading: true, error: null });

          const data = await carsApi.getCars(filters);

          set({
            cars: [...cars, ...data],
            hasMore: data.length === limit,
          });
        } catch (error: any) {
          set({
            error: error?.message ?? "Failed to load more cars",
          });
        } finally {
          set({ isLoading: false });
        }
      },

      // ✅ Избранное
      toggleFavorite: (id) => {
        const { favorites } = get();

        set({
          favorites: favorites.includes(id)
            ? favorites.filter((favId) => favId !== id)
            : [...favorites, id],
        });
      },
    }),
    {
      name: "car-rental-store",
      partialize: (state) => ({
        favorites: state.favorites, // ✅ сохраняем только избранное
      }),
    }
  )
);
