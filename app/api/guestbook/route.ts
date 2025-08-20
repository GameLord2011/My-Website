import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // Set this in your Vercel env vars
});

export async function GET() {
  const { rows } = await pool.query("SELECT id, name, message FROM guestbook ORDER BY id DESC LIMIT 100");
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const { name, message } = await req.json();
  if (!name || !message) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  await pool.query("INSERT INTO guestbook (name, message) VALUES ($1, $2)", [name, message]);
  return NextResponse.json({ success: true });
}
