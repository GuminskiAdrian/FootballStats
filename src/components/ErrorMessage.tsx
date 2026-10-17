import type { ApiError } from "../api/client";

interface ErrorMessageProps {
  error: ApiError;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <div role="alert">
      <p>{error.message}</p>
      {error.retryAfterSeconds !== null && (
        <p>Try again in {error.retryAfterSeconds} seconds.</p>
      )}
    </div>
  );
}
