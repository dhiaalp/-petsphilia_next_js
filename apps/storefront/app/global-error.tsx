"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main style={{ textAlign: "center", padding: "80px 20px" }}>
          <h1>Something went wrong</h1>
          <p>We are working on fixing this. Please try again.</p>
          <button onClick={() => reset()} style={{ marginTop: 20, padding: "10px 24px", cursor: "pointer" }}>
            Try Again
          </button>
        </main>
      </body>
    </html>
  );
}
