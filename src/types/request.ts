// Request types
export interface Request {
  method: string;
  url: string;
  headers?: Record<string, string>;
  body?: unknown;
}
