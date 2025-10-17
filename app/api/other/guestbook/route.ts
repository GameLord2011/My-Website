import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { RegExpMatcher } from "obscenity";
import { englishDataset } from "obscenity";
import { englishRecommendedTransformers } from "obscenity";

export const runtime = "nodejs";

const sql = neon(process.env.POSTGRES_URL!);

async function getCensorList() {
    const matcher = new RegExpMatcher({
        ...englishDataset.build(),
        ...englishRecommendedTransformers,
    });

    return matcher;
}

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
            return NextResponse.json(
                { error: "Missing fields" },
                { status: 400 },
            );
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
