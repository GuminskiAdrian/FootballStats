import { useEffect, useRef, useState } from "react";
import { ApiError } from "../api/client";

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

interface Settled<T> {
  key: string;
  data: T | null;
  error: ApiError | null;
}

const cache = new Map<string, unknown>();
const inFlight = new Map<string, Promise<unknown>>();

function toApiError(error: unknown): ApiError {
  return error instanceof ApiError
    ? error
    : new ApiError("Unknown error", null, null);
}

export function useFetch<T>(
  key: string | null,
  fetcher: () => Promise<T>,
): FetchState<T> {
  const [settled, setSettled] = useState<Settled<T> | null>(null);
  const fetcherRef = useRef(fetcher);

  useEffect(() => {
    fetcherRef.current = fetcher;
  });

  useEffect(() => {
    if (key === null || cache.has(key)) {
      return;
    }

    let ignore = false;

    let request = inFlight.get(key) as Promise<T> | undefined;

    if (!request) {
      request = fetcherRef
        .current()
        .then((data) => {
          cache.set(key, data);
          return data;
        })
        .finally(() => {
          inFlight.delete(key);
        });
      inFlight.set(key, request);
    }

    request
      .then((data) => {
        if (!ignore) {
          setSettled({ key, data, error: null });
        }
      })
      .catch((error: unknown) => {
        if (!ignore) {
          setSettled({ key, data: null, error: toApiError(error) });
        }
      });

    return () => {
      ignore = true;
    };
  }, [key]);

  if (key === null) {
    return { data: null, loading: false, error: null };
  }

  if (cache.has(key)) {
    return { data: cache.get(key) as T, loading: false, error: null };
  }

  if (settled !== null && settled.key === key) {
    return { data: settled.data, loading: false, error: settled.error };
  }

  return { data: null, loading: true, error: null };
}
