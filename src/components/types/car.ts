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
  accessories: string[];
  functionalities: string[];
  rentalConditions: string[];
  fuelConsumption: string;
  engineSize: string;
  address: string;
  type: string;       
}
