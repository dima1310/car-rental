import styles from "./page.module.css";
import { carsApi } from "@/src/components/services/carsApi";
import { BookingForm } from "@/src/components/car/BookingForm/BookingForm";

interface CarDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
  const { id } = await params;
  const car = await carsApi.getCarById(id);

  if (!car) {
    return (
      <main className={styles.page}>
        <h1>Car not found</h1>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* LEFT */}
        <div className={styles.left}>
          <img
            src={car.img}
            alt={`${car.make} ${car.model}`}
            className={styles.image}
          />

          <div className={styles.booking}>
            {/* <h3 className={styles.bookingTitle}>Book your car now</h3>
            <p className={styles.bookingText}>
              Stay connected! We are always ready to help you.
            </p> */}

            <BookingForm carId={car.id} />
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <h1 className={styles.title}>
            {car.make} {car.model}, {car.year}
          </h1>

          <div className={styles.meta}>
            <span>ID: {car.id}</span>
            <span>{car.address}</span>
            <span>Mileage: {car.mileage.toLocaleString("en-US")} km</span>
          </div>

          <p className={styles.price}>{car.rentalPrice}</p>
          <p className={styles.description}>{car.description}</p>

          <section className={styles.section}>
            <h3>Rental Conditions:</h3>
            <ul>
              <li>Minimum age: 25</li>
              <li>Security deposit required</li>
              <li>Valid driver’s license</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h3>Car Specifications:</h3>
            <ul>
              <li>Year: {car.year}</li>
              <li>Fuel consumption: {car.fuelConsumption}</li>
              <li>Engine size: {car.engineSize}</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h3>Accessories and functionalities:</h3>
            <ul>
              <li>Leather seats</li>
              <li>Panoramic sunroof</li>
              <li>Remote start</li>
              <li>Blind-spot monitoring</li>
              <li>Premium audio system</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
