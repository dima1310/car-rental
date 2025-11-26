"use client";

import { useState } from "react";
import { useCarsStore } from "@/src/components/store/useCarStore";
import styles from "./Filter.module.css";

export const Filters = () => {
  const { setFilters } = useCarsStore();

  // локальные значения инпутов
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
    <div className={styles.wrapper}>
      {/* Brand */}
      <div className={styles.field}>
        <label>Brand</label>
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className={styles.select}
        >
          <option value="">All</option>
          <option value="Audi">Audi</option>
          <option value="BMW">BMW</option>
          <option value="Mercedes">Mercedes</option>
          <option value="Porsche">Porsche</option>
          <option value="Toyota">Toyota</option>
        </select>
      </div>

      {/* Price */}
      <div className={styles.field}>
        <label>Price up to</label>
        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={styles.select}
        >
          <option value="">Any</option>
          <option value="40">40$</option>
          <option value="50">50$</option>
          <option value="60">60$</option>
          <option value="70">70$</option>
          <option value="80">80$</option>
        </select>
      </div>

      {/* Mileage */}
      <div className={styles.field}>
        <label>Mileage</label>
        <div className={styles.mileageRow}>
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

      <div className={styles.buttons}>
        <button className={styles.apply} onClick={handleApplyFilters}>
          Apply
        </button>
        <button className={styles.reset} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};
