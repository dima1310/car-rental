"use client";

import { useState } from "react";
import { useCarsStore } from "@/src/components/store/useCarStore";
import css from "./Filter.module.css";

const Filters = () => {
  const { setFilters } = useCarsStore();

  const [brandValue, setBrandValue] = useState<string | null>(null);
  const [priceValue, setPriceValue] = useState<string | null>(null);
  const [fromVal, setFromVal] = useState<string | null>(null);
  const [toVal, setToVal] = useState<string | null>(null);

  const [brandOpen, setBrandOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  const BRANDS = ["BMW", "Audi", "Volvo", "Subaru", "Hyundai", "Mini", "Buick"];
  const PRICES = ["30", "40", "50", "60", "70", "80"];

  const applyFilters = () => {
    setFilters({
      brand: brandValue,
      price: priceValue ? Number(priceValue) : null,
      mileageFrom: fromVal ? Number(fromVal) : null,
      mileageTo: toVal ? Number(toVal) : null,
    });
  };

  return (
    <section className={css.panel}>
      {/* BRAND */}
      <div className={css.block}>
        <label className={css.label}>Car brand</label>

        <div
          className={css.selector}
          onClick={() => {
            setBrandOpen(!brandOpen);
            setPriceOpen(false);
          }}
        >
          <span>{brandValue ?? "Choose a brand"}</span>
          <img
            src="/strela.svg"
            alt=""
            className={`${css.arrow} ${brandOpen ? css.arrowOpen : ""}`}
          />
        </div>

        {brandOpen && (
          <div className={css.drop}>
            <button
              className={`${css.opt} ${brandValue === null ? css.active : ""}`}
              onClick={() => setBrandValue(null)}
            >
              All brands
            </button>

            {BRANDS.map((b) => (
              <button
                key={b}
                className={`${css.opt} ${brandValue === b ? css.active : ""}`}
                onClick={() => setBrandValue(b)}
              >
                {b}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* PRICE */}
      <div className={css.block}>
        <label className={css.label}>Price / 1 hour</label>

        <div
          className={css.selector}
          onClick={() => {
            setPriceOpen(!priceOpen);
            setBrandOpen(false);
          }}
        >
          <span>{priceValue ? `Up to $${priceValue}` : "Choose a price"}</span>
          <img
            src="/strela.svg"
            alt=""
            className={`${css.arrow} ${priceOpen ? css.arrowOpen : ""}`}
          />
        </div>

        {priceOpen && (
          <div className={css.drop}>
            <button
              className={`${css.opt} ${priceValue === null ? css.active : ""}`}
              onClick={() => setPriceValue(null)}
            >
              Any price
            </button>

            {PRICES.map((p) => (
              <button
                key={p}
                className={`${css.opt} ${priceValue === p ? css.active : ""}`}
                onClick={() => setPriceValue(p)}
              >
                Up to ${p}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* MILEAGE */}
      <div className={css.mileageBox}>
        <div className={css.mileageItem}>
          <span className={css.mlabel}>From</span>
          <input
            type="number"
            value={fromVal ?? ""}
            onChange={(e) => setFromVal(e.target.value || null)}
            className={css.mInput}
          />
        </div>

        <div className={css.vLine}></div>

        <div className={css.mileageItem}>
          <span className={css.mlabel}>To</span>
          <input
            type="number"
            value={toVal ?? ""}
            onChange={(e) => setToVal(e.target.value || null)}
            className={css.mInput}
          />
        </div>
      </div>

      <button className={css.searchBtn} onClick={applyFilters}>
        Search
      </button>
    </section>
  );
};

export default Filters;
