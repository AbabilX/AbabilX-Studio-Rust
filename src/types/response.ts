// Response types
export interface Response {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: unknown;
}
