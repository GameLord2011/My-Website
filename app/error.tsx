"use client";

import GlobalError from '@/app/global-error';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
  <html>
    <body>
      <GlobalError reset={reset} />
    </body>
  </html>
);
}