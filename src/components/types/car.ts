export interface CarsFilters {
  brand?: string | null;
  price?: number | null;
  mileageFrom?: number | null;
  mileageTo?: number | null;
}

export interface Car {
  id: string;

  make: string;
  model: string;
  year: number;

  rentalPrice: string;
  mileage: number;

  img: string;
  description: string;

  /** ✅ может прийти как массив */
  accessories: string[];

  /** ✅ может прийти как массив */
  functionalities: string[];

  /**
   * ✅ ВАЖНО
   * backend иногда шлёт:
   * - string
   * - string[]
   */
  rentalConditions: string | string[];

  fuelConsumption: string;
  engineSize: string;

  /**
   * ✅ иногда пустая строка
   * формат: "Kyiv, Ukraine"
   */
  address: string;

  /**
   * ✅ используется в Card
   */
  type: string;
}
