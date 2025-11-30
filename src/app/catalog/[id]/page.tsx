import s from "./page.module.css";
import { carsApi } from "@/src/components/services/carsApi";
import { BookingForm } from "@/src/components/car/BookingForm/BookingForm";

type PageProps = {
  params: { id: string };
};

export default async function CarDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const car = await carsApi.getCarById(id);

  if (!car) {
    return (
      <main className={s.screen}>
        <h1>Car not found</h1>
      </main>
    );
  }

  /* ---------------- ADDRESS ---------------- */
  const address = (car as any).address ?? "";
  const [city = "", rawCountry = ""] = address.split(",");
  const country = rawCountry.trim();

  /* ---------------- RENTAL CONDITIONS ---------------- */
  const rc = (car as any).rentalConditions as unknown;

  const rentalConditions: string[] = Array.isArray(rc)
    ? rc
    : typeof rc === "string"
    ? rc
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  /* ---------------- ACCESSORIES ---------------- */
  const accessories: string[] = Array.isArray((car as any).accessories)
    ? (car as any).accessories
    : [];

  /* ---------------- FUNCTIONALITIES ---------------- */
  const functionalities: string[] = Array.isArray((car as any).functionalities)
    ? (car as any).functionalities
    : [];

  return (
    <main className={s.screen}>
      <div className={s.frame}>
        {/* LEFT */}
        <div className={s.columnLeft}>
          <img
            src={car.img}
            alt={`${car.make} ${car.model}`}
            className={s.photoLarge}
          />

          <div className={s.boxBooking}>
            <BookingForm carId={car.id} />
          </div>
        </div>

        {/* RIGHT */}
        <div className={s.columnRight}>
          <h1 className={s.headingMain}>
            {car.make} {car.model}, {car.year}
          </h1>

          <div className={s.infoList}>
            <div className={s.iconRow}>
              <img src="/icons/calendar.svg" alt="id" />
              <span>{car.id}</span>
            </div>

            <div className={s.iconRow}>
              <img src="/icons/location.svg" alt="location" />
              <span>
                {city}
                {country ? `, ${country}` : ""}
              </span>
            </div>

            <div className={s.iconRow}>
              <img src="/icons/fuel-pump.svg" alt="mileage" />
              <span>{car.mileage.toLocaleString("en-US")} km</span>
            </div>
          </div>

          <p className={s.priceTag}>{car.rentalPrice}</p>
          <p className={s.textBody}>{car.description}</p>

          {/* RENTAL CONDITIONS */}
          <section className={s.block}>
            <h3 className={s.blockTitle}>Rental Conditions</h3>
            <ul className={s.listReset}>
              {rentalConditions.map((item, i) => (
                <li key={i} className={s.listItem}>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* SPECIFICATIONS */}
          <section className={s.block}>
            <h3 className={s.blockTitle}>Specifications</h3>
            <ul className={s.listReset}>
              <li className={s.listItem}>Year: {car.year}</li>
              <li className={s.listItem}>
                Fuel consumption: {car.fuelConsumption}
              </li>
              <li className={s.listItem}>Engine size: {car.engineSize}</li>
            </ul>
          </section>

          {/* ACCESSORIES */}
          <section className={s.block}>
            <h3 className={s.blockTitle}>Accessories</h3>
            <ul className={s.listReset}>
              {accessories.map((item, i) => (
                <li key={i} className={s.listItem}>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* FUNCTIONALITIES */}
          <section className={s.block}>
            <h3 className={s.blockTitle}>Functionalities</h3>
            <ul className={s.listReset}>
              {functionalities.map((item, i) => (
                <li key={i} className={s.listItem}>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
