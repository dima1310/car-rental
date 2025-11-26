"use client";

import { useState } from "react";
import { carsApi } from "@/src/components/services/carsApi";

interface BookingFormProps {
  carId: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({ carId }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      await carsApi.createBooking({
        carId,
        name,
        phone,
        startDate,
        endDate,
      });

      alert("Car successfully booked!"); // можеш замінити на toast
      setName("");
      setPhone("");
      setStartDate("");
      setEndDate("");
    } catch {
      alert("Booking failed, please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book this car</h2>

      <label>
        Name
        <input
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Phone
        <input
          type="tel"
          value={phone}
          required
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>

      <label>
        From
        <input
          type="date"
          value={startDate}
          required
          onChange={(e) => setStartDate(e.target.value)}
        />
      </label>

      <label>
        To
        <input
          type="date"
          value={endDate}
          required
          onChange={(e) => setEndDate(e.target.value)}
        />
      </label>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Booking..." : "Book now"}
      </button>
    </form>
  );
};
