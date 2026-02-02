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
    <main className="container">
    <h1 className="h1">Affordable Chapter SA</h1>
<p className="p">Find affordable cars in South Africa</p>

  <a href="/buyer-budget" className="btn btn-primary" style={{ margin: "10px 0 16px" }}>
  Post Your Budget
</a>

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

<div className="pills">
{CATEGORIES.map((c) => (<button
  key={c.label}
  onClick={() => setSelected(c.value)}
  className={`pill ${selected === c.value ? "pill-active" : ""}`}
>
  {c.label}
</button>

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
