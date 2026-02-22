import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: "" }));

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

  if (!ADMIN_PASSWORD) {
    return NextResponse.json(
      { ok: false, message: "ADMIN_PASSWORD not set" },
      { status: 500 }
    );
  }

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json(
      { ok: false, message: "Wrong password" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ ok: true });

  res.cookies.set("admin_auth", "1", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
