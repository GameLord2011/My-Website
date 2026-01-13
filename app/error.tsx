"use client";

export default function ErrorBoundary({ reset }: { reset: () => void }) {
    return (
        <div>
            <h2>What the heck?!? A global error!</h2>
            <p>If you see this page CONTACT ME IMMEDIATELY</p>
            <button
                type="button"
                onClick={() => reset()}
                aria-label="Try again and reset the error page"
            >
                Try again
            </button>
        </div>
    );
}
