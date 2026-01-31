"use client";

import { useState } from "react";

const VEHICLE_TYPES = ["hatchback", "sedan", "suv", "bakkie", "minibus"];

function formatZARInput(value) {
  // keep digits only
  return value.replace(/[^\d]/g, "");
}

export default function BuyerBudgetPage() {
  const [form, setForm] = useState({
    vehicleType: "hatchback",
    makeModel: "",
    minYear: "",
    maxYear: "",
    budget: "",
    location: "",
    contact: "",
    notes: "",
  });

  const [status, setStatus] = useState({ type: "idle", message: "" });

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: "loading", message: "Submitting..." });

    // Basic validation
    if (!form.makeModel.trim()) {
      setStatus({ type: "error", message: "Please enter Make & Model." });
      return;
    }
    if (!form.budget.trim()) {
      setStatus({ type: "error", message: "Please enter your budget." });
      return;
    }
    if (!form.contact.trim()) {
      setStatus({ type: "error", message: "Please enter a phone/WhatsApp number." });
      return;
    }

    try {
      const res = await fetch("/api/buyer-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          budget: Number(form.budget),
          minYear: form.minYear ? Number(form.minYear) : null,
          maxYear: form.maxYear ? Number(form.maxYear) : null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({ type: "error", message: data?.error || "Failed to submit." });
        return;
      }

      setStatus({ type: "success", message: "✅ Request submitted! Sellers will be notified soon." });

      // Clear form
      setForm({
        vehicleType: "hatchback",
        makeModel: "",
        minYear: "",
        maxYear: "",
        budget: "",
        location: "",
        contact: "",
        notes: "",
      });
    } catch (err) {
      setStatus({ type: "error", message: "Network error. Please try again." });
    }
  }

  return (
    <main style={{ maxWidth: 700, margin: "0 auto", padding: 16 }}>
      <h1 style={{ fontSize: 28, marginBottom: 6 }}>Buyer Budget Request</h1>
      <p style={{ opacity: 0.75, marginTop: 0 }}>
        Tell us what car you want and your budget. Sellers can respond with offers.
      </p>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Vehicle Type</div>
          <select
            value={form.vehicleType}
            onChange={(e) => update("vehicleType", e.target.value)}
            style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
          >
            {VEHICLE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t.toUpperCase()}
              </option>
            ))}
          </select>
        </label>

        <label>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Make & Model</div>
          <input
            value={form.makeModel}
            onChange={(e) => update("makeModel", e.target.value)}
            placeholder="e.g. Toyota Corolla"
            style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
          />
        </label>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <label>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Min Year (optional)</div>
            <input
              value={form.minYear}
              onChange={(e) => update("minYear", formatZARInput(e.target.value))}
              placeholder="e.g. 2015"
              style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
            />
          </label>

          <label>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Max Year (optional)</div>
            <input
              value={form.maxYear}
              onChange={(e) => update("maxYear", formatZARInput(e.target.value))}
              placeholder="e.g. 2019"
              style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
            />
          </label>
        </div>

        <label>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Budget (ZAR)</div>
          <input
            value={form.budget}
            onChange={(e) => update("budget", formatZARInput(e.target.value))}
            placeholder="e.g. 110000"
            style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
          />
          <div style={{ opacity: 0.7, marginTop: 6 }}>
            Tip: enter numbers only (110000)
          </div>
        </label>

        <label>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Location</div>
          <input
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            placeholder="e.g. Johannesburg"
            style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
          />
        </label>

        <label>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Contact (WhatsApp / Phone)</div>
          <input
            value={form.contact}
            onChange={(e) => update("contact", e.target.value)}
            placeholder="e.g. 0620000000"
            style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
          />
        </label>

        <label>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Notes (optional)</div>
          <textarea
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            placeholder="e.g. Automatic, low mileage, full service history"
            rows={4}
            style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
          />
        </label>

        <button
          type="submit"
          disabled={status.type === "loading"}
          style={{
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid #111",
            background: "#111",
            color: "#fff",
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          {status.type === "loading" ? "Submitting..." : "Submit Budget Request"}
        </button>

        {status.type !== "idle" && (
          <div
            style={{
              padding: 12,
              borderRadius: 12,
              border: "1px solid #eee",
              background: "#fafafa",
            }}
          >
            {status.message}
          </div>
        )}
      </form>
    </main>
  );
}
