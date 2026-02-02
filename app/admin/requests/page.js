"use client";

import { useEffect, useState } from "react";

function formatZAR(amount) {
  const n = Number(amount);
  if (!Number.isFinite(n)) return "";
  return "R " + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default function AdminRequestsPage() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState({ type: "loading", message: "Loading requests..." });

  async function load() {
  const pass = window.prompt("Enter admin password:");
  if (!pass) {
    setStatus({ type: "error", message: "Password required." });
    return;
  }

  setStatus({ type: "loading", message: "Loading requests..." });

  try {
    const res = await fetch(`/api/buyer-requests?pass=${encodeURIComponent(pass)}`, {
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok || !data?.ok) {
      setStatus({ type: "error", message: data?.error || "Failed to load requests." });
      return;
    }

    setItems(Array.isArray(data.requests) ? data.requests : []);
    setStatus({ type: "success", message: "Loaded." });
  } catch (e) {
    setStatus({ type: "error", message: "Network error while loading." });
  }
}


      setItems(Array.isArray(data.requests) ? data.requests : []);
      setStatus({ type: "success", message: "Loaded." });
    } catch (e) {
      setStatus({ type: "error", message: "Network error while loading." });
    }
  }

  useEffect(() => {
    load();
  }, []);

  const alertClass =
    status.type === "success"
      ? "alert alert-success"
      : status.type === "error"
      ? "alert alert-error"
      : "alert alert-info";

  return (
    <main className="container">
      <a href="/" className="backlink">← Back to Home</a>

      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <div>
          <h1 className="h1">Admin: Buyer Requests</h1>
          <p className="p">Latest budget requests from buyers.</p>
        </div>

        <button className="btn btn-primary" type="button" onClick={load}>
          Refresh
        </button>
      </div>

      <div className={alertClass} style={{ marginBottom: 12 }}>
        {status.message} {items.length ? `(${items.length})` : ""}
      </div>

      {items.length === 0 ? (
        <div className="card">
          <div style={{ fontWeight: 900, marginBottom: 6 }}>No requests yet</div>
          <div className="small">Ask someone to submit a Buyer Budget request first.</div>
        </div>
      ) : (
        <div className="grid">
          {items.map((r) => (
            <div key={r.id} className="card">
              <div style={{ fontWeight: 900, fontSize: 18 }}>
                {r.makeModel || "Unknown"}{" "}
                <span style={{ fontWeight: 800, opacity: 0.6 }}>
                  ({String(r.vehicleType || "").toUpperCase()})
                </span>
              </div>

              <div className="price">{formatZAR(r.budget)}</div>

              <div className="small" style={{ marginTop: 6 }}>
                {r.location ? `📍 ${r.location}` : "📍 Location not provided"}
              </div>

              <div className="small" style={{ marginTop: 6 }}>
                {r.minYear || r.maxYear ? (
                  <>📅 Year: {r.minYear || "?"} - {r.maxYear || "?"}</>
                ) : (
                  <>📅 Year: any</>
                )}
              </div>

              <div style={{ marginTop: 10, fontWeight: 800 }}>
                Contact: <span style={{ fontWeight: 900 }}>{r.contact}</span>
              </div>

              {r.notes ? (
                <div className="small" style={{ marginTop: 8 }}>
                  Notes: {r.notes}
                </div>
              ) : null}

              <div className="small" style={{ marginTop: 10, opacity: 0.7 }}>
                {r.createdAt ? `Created: ${new Date(r.createdAt).toLocaleString()}` : ""}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
