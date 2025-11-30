import axios from "axios";
import { apiClient } from "./apiClient";
import type { CarsFilters, Car } from "../types/car";

export const carsApi = {
  async getCars(filters: CarsFilters): Promise<Car[]> {
    const params: Record<string, unknown> = {};

    if (filters.brand) params.brand = filters.brand;
    if (filters.price) params.rentalPrice = filters.price;

    if (filters.mileageFrom != null) {
      params.mileageFrom = filters.mileageFrom;
    }

    if (filters.mileageTo != null) {
      params.mileageTo = filters.mileageTo;
    }

    const { data } = await apiClient.get("/cars", { params });

    // 👉 бекенд чаще всего возвращает просто массив машин
    if (Array.isArray(data)) {
      return data as Car[];
    }

    // на случай, если обернут в объект { cars: [...] }
    if (data && Array.isArray((data as any).cars)) {
      return (data as any).cars as Car[];
    }

    return [];
  },

  async getCarById(id: string): Promise<Car | null> {
    try {
      const { data } = await apiClient.get(`/cars/${id}`);
      return data as Car;
    } catch (error) {
      // важное: 404 не ломает билд, а отдаём null
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },
};
