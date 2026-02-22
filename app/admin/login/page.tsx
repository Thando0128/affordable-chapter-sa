"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin/requests";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMsg(data?.message || "Wrong password");
        return;
      }

      router.push(next);
      router.refresh();
    } catch {
      setMsg("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 16 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>Admin Login</h1>
      <p style={{ marginTop: 8, opacity: 0.8 }}>
        Enter the admin password to continue.
      </p>

      <form onSubmit={onSubmit} style={{ marginTop: 16, display: "grid", gap: 12 }}>
        <input
          type="password"
          placeholder="Admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 12, borderRadius: 10, border: "1px solid #ddd" }}
        />

        <button
          type="submit"
          disabled={loading || !password}
          style={{
            padding: 12,
            borderRadius: 10,
            border: "none",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        {msg ? <div style={{ color: "crimson", fontWeight: 700 }}>{msg}</div> : null}
      </form>
    </div>
  );
      }
