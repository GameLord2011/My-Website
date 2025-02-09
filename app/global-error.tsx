"use client";

export default function GlobalError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    // global-error must include html and body tags
    <div>
        <h2>What the heck?!? A global error!</h2>
        <p>If you see this page CONTACT ME IMMEDIATELY</p>
        <button type="button" onClick={() => reset()}>
          Try again
        </button>
      </div>
  );
}
