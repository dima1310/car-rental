"use client";

import { useState } from "react";
import { useCarsStore } from "@/src/components/store/useCarStore";
import styles from "./Filter.module.css";

export const Filters = () => {
  const { setFilters } = useCarsStore();

  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [mileageFrom, setMileageFrom] = useState("");
  const [mileageTo, setMileageTo] = useState("");

  const handleApplyFilters = () => {
    setFilters({
      brand: brand || null,
      price: price ? Number(price) : null,
      mileageFrom: mileageFrom ? Number(mileageFrom) : null,
      mileageTo: mileageTo ? Number(mileageTo) : null,
    });
  };

  const handleReset = () => {
    setBrand("");
    setPrice("");
    setMileageFrom("");
    setMileageTo("");
    setFilters({});
  };

  return (
    <section className={styles.section}>
      <div className={styles.fields}>
        {/* Brand */}
        <div className={styles.field}>
          <span className={styles.label}>Car brand</span>
          <div className={styles.controlWrapper}>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className={styles.select}
            >
              <option value="">Choose a brand</option>
              <option value="Buick">Buick</option>
              <option value="Volvo">Volvo</option>
              <option value="Subaru">Subaru</option>
              <option value="Hyundai">Hyundai</option>
              <option value="BMW">BMW</option>
              <option value="Mini">Mini</option>
            </select>
          </div>
        </div>

        {/* Price */}
        <div className={styles.field}>
          <span className={styles.label}>Price / 1 hour</span>
          <div className={styles.controlWrapper}>
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={styles.select}
            >
              <option value="">Choose a price</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="60">60</option>
              <option value="70">70</option>
              <option value="80">80</option>
            </select>
          </div>
        </div>

        {/* Mileage */}
        <div className={styles.field}>
          <span className={styles.label}>Car mileage / km</span>
          <div className={styles.mileageGroup}>
            <input
              type="number"
              placeholder="From"
              value={mileageFrom}
              onChange={(e) => setMileageFrom(e.target.value)}
              className={styles.input}
            />
            <input
              type="number"
              placeholder="To"
              value={mileageTo}
              onChange={(e) => setMileageTo(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.search}
          onClick={handleApplyFilters}
        >
          Search
        </button>

        {/* <button type="button" className={styles.reset} onClick={handleReset}>
          Reset
        </button> */}
      </div>
    </section>
  );
};
