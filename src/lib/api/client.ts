import { useAuthStore } from "@/state/useAuthStore";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  headers?: Record<string, string>;
  cache?: RequestCache;
  token?: string | null;
  retries?: number;
  timeout?: number;
};

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
  user?: T;
  error?: string;
};

type Interceptor = {
  request?: (config: RequestInit) => RequestInit;
  response?: (response: Response) => Promise<Response>;
  error?: (error: Error) => Error;
};

class APIClient {
  private baseURL: string;
  private interceptors: Interceptor[] = [];
  private maxRetries = 3;
  private timeout = 30000;

  constructor(baseURL: string = BACKEND_URL) {
    this.baseURL = baseURL;
  }

  addInterceptor(interceptor: Interceptor): void {
    this.interceptors.push(interceptor);
  }

  private async getAuthToken(): Promise<string | null> {
    // Get token from auth store if available
    try {
      const { backendToken } = useAuthStore.getState();
      return backendToken;
    } catch {
      return null;
    }
  }

  private async withTimeout(
    promise: Promise<Response>,
    timeoutMs: number
  ): Promise<Response> {
    return Promise.race([
      promise,
      new Promise<Response>((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), timeoutMs)
      ),
    ]);
  }

  private async request<T>(
    path: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const token = options.token || (await this.getAuthToken());
    const url = path.startsWith("http") ? path : `${this.baseURL}${path}`;
    const maxRetries = options.retries ?? this.maxRetries;
    const timeout = options.timeout ?? this.timeout;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        let config: RequestInit = {
          method: options.method ?? "GET",
          headers,
          body: options.body ? JSON.stringify(options.body) : undefined,
          cache: options.cache ?? "no-store",
        };

        // Apply request interceptors
        for (const interceptor of this.interceptors) {
          if (interceptor.request) {
            config = interceptor.request(config);
          }
        }

        let response = await this.withTimeout(
          fetch(url, config),
          timeout
        );

        // Apply response interceptors
        for (const interceptor of this.interceptors) {
          if (interceptor.response) {
            response = await interceptor.response(response.clone());
          }
        }

        const contentType = response.headers.get("content-type");
        let data: unknown = null;

        if (contentType?.includes("application/json")) {
          data = await response.json();
        } else {
          data = await response.text();
        }

        if (!response.ok) {
          const errorMessage =
            typeof data === "object" &&
            data !== null &&
            "message" in data &&
            typeof data.message === "string"
              ? data.message
              : `Request failed: ${response.status}`;

          // Retry on server errors, not client errors
          if (response.status >= 500 && attempt < maxRetries) {
            lastError = new Error(errorMessage);
            await new Promise((resolve) =>
              setTimeout(resolve, Math.pow(2, attempt) * 100)
            ); // Exponential backoff
            continue;
          }

          throw new Error(errorMessage);
        }

        return data as T;
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));

        // Apply error interceptors
        for (const interceptor of this.interceptors) {
          if (interceptor.error) {
            err = interceptor.error(err);
          }
        }

        lastError = err;

        // Don't retry on timeout or final attempt
        if (attempt < maxRetries && error instanceof Error && error.message !== "Request timeout") {
          await new Promise((resolve) =>
            setTimeout(resolve, Math.pow(2, attempt) * 100)
          );
          continue;
        }

        throw err;
      }
    }

    throw lastError || new Error("Request failed");
  }

  async get<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: "GET" });
  }

  async post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: "POST", body });
  }

  async put<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: "PUT", body });
  }

  async delete<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: "DELETE" });
  }

  async patch<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: "PATCH", body });
  }
}

export const apiClient = new APIClient();

// Backward compatible default export for existing code
export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  return apiClient.request<T>(path, options);
}
