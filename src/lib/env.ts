
import "server-only";

export function getApiUrl(): string {
  const apiUrl = process.env.API_URL?.trim();

  if (!apiUrl) {
    throw new Error("Missing required environment variable: API_URL");
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(apiUrl);
  } catch {
    throw new Error("API_URL must be a valid absolute URL.");
  }

  if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") {
    throw new Error("API_URL must use HTTP or HTTPS.");
  }

  return parsedUrl.toString().replace(/\/+$/, "");
}
