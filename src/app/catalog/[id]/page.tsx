import { carsApi } from "@/src/components/services/carsApi";
import { BookingForm } from "@/src/components/car/BookingForm/BookingForm";

interface CarDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
  // 👇 ОБЯЗАТЕЛЬНО: дожидаемся params
  const { id } = await params;

  // теперь id — строка
  const car = await carsApi.getCarById(id);

  if (!car) {
    return (
      <main>
        <h1>Car not found</h1>
      </main>
    );
  }

  return (
    <main>
      <h1>
        {car.make} {car.model}, {car.year}
      </h1>

      <img
        src={car.img}
        alt={`${car.make} ${car.model}`}
        width={600}
        height={400}
        style={{ objectFit: "cover" }}
      />

      <p>{car.description}</p>

      <ul>
        <li>Fuel: {car.fuelConsumption}</li>
        <li>Engine: {car.engineSize}</li>
        <li>Mileage: {car.mileage.toLocaleString("en-US")} km</li>
      </ul>

      <BookingForm carId={car.id} />
    </main>
  );
}
