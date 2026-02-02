// Simple in-memory storage (temporary)
// Note: Vercel serverless may reset memory sometimes.
// Later we will replace this with MongoDB.
let REQUESTS = [];

export async function GET(req) {
  const url = new URL(req.url);
  const pass = url.searchParams.get("pass") || "";

  if (!process.env.ADMIN_PASSWORD) {
    return Response.json({ ok: false, error: "Admin password not set." }, { status: 500 });
  }

  if (pass !== process.env.ADMIN_PASSWORD) {
    return Response.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  return Response.json({ ok: true, requests: REQUESTS.slice(0, 50) }, { status: 200 });
}

    const makeModel = String(body.makeModel || "").trim();
    const contact = String(body.contact || "").trim();
    const budget = Number(body.budget);

    if (!makeModel) {
      return Response.json({ error: "Make & Model is required." }, { status: 400 });
    }
    if (!contact) {
      return Response.json({ error: "Contact number is required." }, { status: 400 });
    }
    if (!Number.isFinite(budget) || budget <= 0) {
      return Response.json({ error: "Budget must be a valid number." }, { status: 400 });
    }

    const newRequest = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      vehicleType: body.vehicleType || "hatchback",
      makeModel,
      minYear: body.minYear ?? null,
      maxYear: body.maxYear ?? null,
      budget,
      location: body.location || "",
      contact,
      notes: body.notes || "",
      status: "open",
    };

    REQUESTS.unshift(newRequest);

    return Response.json({ ok: true, request: newRequest }, { status: 201 });
  } catch (e) {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }
}

export async function GET() {
  // Optional: allow viewing the latest requests
  return Response.json({ ok: true, requests: REQUESTS.slice(0, 50) }, { status: 200 });
}
