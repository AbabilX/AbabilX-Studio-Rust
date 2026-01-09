/**
 * HTTP Service - Tauri backend integration for API requests
 * Calls the Rust core via Tauri invoke
 */

import { invoke } from "@tauri-apps/api/core";

export interface HttpRequest {
  method?: string;
  url?: RequestUrl;
  header?: RequestHeader[];
  body?: RequestBody;
  auth?: RequestAuth;
}

export interface RequestUrl {
  raw?: string;
  protocol?: string;
  host?: string[];
  path?: string[];
  query?: QueryParam[];
}

export interface QueryParam {
  key: string;
  value?: string;
  disabled?: boolean;
}

export interface RequestHeader {
  key: string;
  value: string;
  disabled?: boolean;
}

export interface RequestBody {
  mode?: "none" | "raw" | "urlencoded" | "formdata" | "graphql";
  raw?: string;
}

export interface RequestAuth {
  type?: "noauth" | "bearer" | "basic";
  bearer?: AuthVariable[];
  basic?: AuthVariable[];
}

export interface AuthVariable {
  key: string;
  value: string;
}

export interface HttpResponse {
  statusCode: number;
  headers: [string, string][];
  body: string;
  durationMs: number;
  error?: string;
}

/**
 * Make an HTTP request via the Rust backend
 */
export async function makeHttpRequest(
  request: HttpRequest
): Promise<HttpResponse> {
  try {
    const response = await invoke<HttpResponse>("make_http_request", {
      request,
    });
    return response;
  } catch (error) {
    return {
      statusCode: 0,
      headers: [],
      body: "",
      durationMs: 0,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Helper to build a simple GET request
 */
export function buildGetRequest(
  url: string,
  headers?: RequestHeader[]
): HttpRequest {
  return {
    method: "GET",
    url: { raw: url },
    header: headers,
  };
}

/**
 * Helper to build a POST request with JSON body
 */
export function buildPostRequest(
  url: string,
  body: unknown,
  headers?: RequestHeader[]
): HttpRequest {
  const defaultHeaders: RequestHeader[] = [
    { key: "Content-Type", value: "application/json" },
    ...(headers ?? []),
  ];

  return {
    method: "POST",
    url: { raw: url },
    header: defaultHeaders,
    body: {
      mode: "raw",
      raw: typeof body === "string" ? body : JSON.stringify(body),
    },
  };
}

export const httpService = {
  makeRequest: makeHttpRequest,
  buildGetRequest,
  buildPostRequest,
};
