"use client";

import styles from "./BookingForm.module.css";

interface Props {
  carId: string;
}

export const BookingForm = ({ carId }: Props) => {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Book your car now</h2>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name*"
          className={styles.input}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email*"
          className={styles.input}
          required
        />

        <input
          type="Booking date*"
          name="date"
          placeholder="Booking date*"
          className={styles.input}
        />

        <textarea
          name="comment"
          placeholder="Comment"
          className={styles.textarea}
          rows={4}
        />

        <button type="submit" className={styles.button}>
          Send
        </button>
      </form>
    </section>
  );
};
