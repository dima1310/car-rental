"use client";

import Link from "next/link";
import styles from "./Hero.module.css";

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.title}>Find your perfect rental car</h1>

        <p className={styles.subtitle}>
          Reliable and budget-friendly rentals for any journey
        </p>

        <Link href="/catalog" className={styles.button}>
          View Catalog
        </Link>
      </div>
    </section>
  );
};
