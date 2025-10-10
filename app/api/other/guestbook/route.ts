import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import {
  RegExpMatcher,
  englishDataset,
  englishRecommendedTransformers,
} from "obscenity";

export const runtime = "nodejs";

const sql = neon(process.env.POSTGRES_URL!);

// Censor list cache
//let censorList: string[] | null = null;

//TODO: Replace w/ https://www.npmjs.com/package/obscenity
async function getCensorList() {
  // if (!censorList) {
  // const res = await fetch(
  // `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/profanity_filter.wlist`,
  // );
  // const base64 = await res.text();
  //
  // const decoded = Buffer.from(base64, "base64").toString("utf-8");
  //
  // censorList = decoded
  // .split("\n")
  // .map((w) => w.trim().toLowerCase())
  // .filter(Boolean);
  //
  // console.log("Loaded censor list:", censorList.slice(0, 5)); // Debug preview
  // }

  const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
  });

  return matcher;
}

// function containsCensoredWord(message: string, list: string[]) {
// const normalized = message.toLowerCase().replace(/[^a-z0-9\s]/gi, " "); // Remove punctuation
//
// for (const word of list) {
// const pattern = new RegExp(`\\b${escapeRegExp(word)}\\b`, "i");
// if (pattern.test(normalized)) {
// console.log(`Blocked word detected: "${word}" in message "${message}"`);
// return true;
// }
// }
//
// return false;
// }
//
//function escapeRegExp(word: string) {
//return word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
//}

export async function GET() {
  try {
    const rows = await sql`
      SELECT id, name, message FROM guestbook ORDER BY id DESC LIMIT 100
    `;
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

    const list = await getCensorList();

    if (list.hasMatch(message) || list.hasMatch(name)) {
      return NextResponse.json(
        { error: "Message contains inappropriate language." },
        { status: 400 },
      );
    }

    await sql`
      INSERT INTO guestbook (name, message) VALUES (${trimmedName}, ${trimmedMessage})
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST /guestbook error:", err);
    return NextResponse.json(
      { error: "Failed to submit guestbook entry" },
      { status: 500 },
    );
  }
}
