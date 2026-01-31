"use client";

import { useMemo, useState } from "react";

const CATEGORIES = [
  { label: "All", value: "" },
  { label: "Hatchback", value: "hatchback" },
  { label: "Sedan", value: "sedan" },
  { label: "SUV", value: "suv" },
  { label: "Bakkie", value: "bakkie" },
  { label: "Minibus", value: "minibus" },
];

const CARS = [
  { id: "1", title: "VW Polo Vivo 2019", price: 125000, location: "Johannesburg", category: "hatchback" },
  { id: "2", title: "Toyota Corolla 2016", price: 110000, location: "Pretoria", category: "sedan" },
  { id: "3", title: "Ford Ranger 2018", price: 285000, location: "Roodepoort", category: "bakkie" },
  { id: "4", title: "Toyota Fortuner 2017", price: 310000, location: "Soweto", category: "suv" },
  { id: "5", title: "Toyota Quantum 2015", price: 260000, location: "Germiston", category: "minibus" },
];

function formatZAR(amount) {
  return "R " + String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default function HomePage() {
  const [selected, setSelected] = useState("");

  const filteredCars = useMemo(() => {
    if (!selected) return CARS;
    return CARS.filter((c) => c.category === selected);
  }, [selected]);

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <h1 style={{ fontSize: 28 }}>Affordable Chapter SA</h1>
      <p style={{ opacity: 0.7 }}>Find affordable cars in South Africa</p>
<a
  href="/buyer-budget"
  style={{
    display: "inline-block",
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid #111",
    background: "#111",
    color: "#fff",
    fontWeight: 800,
    textDecoration: "none",
    margin: "10px 0 16px",
  }}
>
  Post Your Budget
</a>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {CATEGORIES.map((c) => (
          <button
            key={c.label}
            onClick={() => setSelected(c.value)}
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              border: "1px solid #ddd",
              background: selected === c.value ? "#111" : "#fff",
              color: selected === c.value ? "#fff" : "#111",
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
        {filteredCars.map((car) => (
          <div key={car.id} style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
            <b>{car.title}</b>
            <div>{formatZAR(car.price)}</div>
            <small>{car.location}</small>
            <div style={{ marginTop: 8 }}>
              <button>View</button>{" "}
              <button>Make Offer</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
