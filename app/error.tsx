"use client";

import GlobalError from "@/app/global-error";

export default function ErrorBoundary({ reset }: { reset: () => void }) {
  return (
    <html>
      <body>
        <GlobalError reset={reset} />
      </body>
    </html>
  );
}
