import axios from 'axios';
import { API_BASE_URL } from '../config';

export class ApiError extends Error {
    readonly status: number | null;
    readonly retryAfterSeconds: number | null;

    constructor(
        message: string,
        status: number | null,
        retryAfterSeconds: number | null,
    ) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.retryAfterSeconds = retryAfterSeconds;
    }
}

const httpClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

function toAPIError(error: unknown): ApiError {
    if (!axios.isAxiosError(error)) {
        return new ApiError('Unknown error', null, null);
    }

    if (!error.response) {
        return new ApiError('No response from server', null, null);
    }

    const status = error.response.status;

    if (status === 429) {
        const resetHeader = Number(error.response.headers['x-requestcounter-reset']);
        const retryAfterSeconds = Number.isFinite(resetHeader) ? resetHeader : null;
        return new ApiError('Too many requests', status, retryAfterSeconds);
    }

    if (status === 403) {
        return new ApiError('Access forbidden', status, null);
    }

    if (status === 404) {
        return new ApiError('Resource not found', status, null);
    }

    return new ApiError(`Server error (${status})`, status, null);
}

export async function get<T>(path: string, signal?: AbortSignal): Promise<T> {
    try {
        const response = await httpClient.get<T>(path, { signal });
        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            throw error;
        }
        throw toAPIError(error);
    }
}