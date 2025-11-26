import { apiClient } from "./apiClient";
import type { Car } from "@/src/components/types/car";

export interface CarsFilters {
  make?: string | null;
  rentalPrice?: string | null;
  mileage?: number | null;
  year?: number | null;
}

export const carsApi = {
  // ============================
  // GET LIST OF CARS + FILTERS
  // ============================
  async getCars(filters: CarsFilters = {}): Promise<Car[]> {
    const res = await apiClient.get("/cars", {
      params: {
        make: filters.make ?? undefined,
        rentalPrice: filters.rentalPrice ?? undefined,
        mileage: filters.mileage ?? undefined,
        year: filters.year ?? undefined,
      },
    });

    // API возвращает объект: { cars: [...], total: number }
    if (Array.isArray(res.data)) return res.data; // fallback
    if (Array.isArray(res.data.cars)) return res.data.cars; // <-- правильный путь

    return [];
  },

  // ============================
  // GET ONE CAR BY ID
  // (API не имеет endpoint /car/{id}, поэтому ищем вручную)
  // ============================
  async getCarById(id: string): Promise<Car | null> {
    try {
      const res = await apiClient.get("/cars");

      const list: Car[] = Array.isArray(res.data.cars) ? res.data.cars : [];

      const found = list.find((item) => item.id === id);

      return found ?? null;
    } catch (err) {
      console.error("getCarById error:", err);
      return null;
    }
  },
};
