"use client";

import Link from "next/link";

export default function ErrorBoundary({ reset }: { reset: () => void }) {
    return (
        <div>
            <h2>What the heck?!? A global error!</h2>
            <p>
                If you see this page in production open an error{" "}
                <Link href="https://github.com/GameLord2011/My-Website/issues">
                    here
                </Link>
            </p>
            <button
                type="button"
                onClick={() => reset()}
                aria-label="Try again and reset the site"
            >
                Try again
            </button>
        </div>
    );
}
