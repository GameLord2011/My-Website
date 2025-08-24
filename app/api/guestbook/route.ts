import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

export const runtime = "nodejs";

let pool: Pool;

if (process.env.NODE_ENV === "production") {
  pool =
    global.pgPool ||
    new Pool({
      connectionString: process.env.POSTGRES_URL!,
      ssl: { rejectUnauthorized: false },
    });
  if (!global.pgPool) {
    global.pgPool = pool;
  }
}
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  pool =
    global.pgPool ||
    new Pool({
      connectionString: "/Tests/testDB.db",
      ssl: { rejectUnauthorized: false },
      host: "localhost",
      port: 3000
    });
  if (!global.pgPool) {
    global.pgPool = pool;
  }
}

export async function GET() {
  try {
    const { rows } = await pool.query(
      "SELECT id, name, message FROM guestbook ORDER BY id DESC LIMIT 100",
    );
    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET /guestbook error:", err);
    return NextResponse.json(
      { error: "Failed to fetch guestbook entries" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, message } = await req.json();

    const trimmedName = name?.trim();
    const trimmedMessage = message?.trim();

    if (!trimmedName || !trimmedMessage) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await pool.query("INSERT INTO guestbook (name, message) VALUES ($1, $2)", [
      trimmedName,
      trimmedMessage,
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST /guestbook error:", err);
    return NextResponse.json(
      { error: "Failed to submit guestbook entry" },
      { status: 500 },
    );
  }
}
