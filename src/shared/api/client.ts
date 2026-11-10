const API_BASE_URL = "https://dummyjson.com";

export class ApiError extends Error {
  readonly status: number | undefined;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === "AbortError";
}

export async function fetchJson(
  path: string,
  signal?: AbortSignal,
): Promise<unknown> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, { signal });
  } catch (error: unknown) {
    if (signal?.aborted || isAbortError(error)) {
      throw error;
    }

    throw new ApiError("Unable to connect to the product service.");
  }

  if (!response.ok) {
    throw new ApiError(
      `The product service returned ${response.status}.`,
      response.status,
    );
  }

  try {
    const body: unknown = await response.json();
    return body;
  } catch (error: unknown) {
    if (signal?.aborted || isAbortError(error)) {
      throw error;
    }

    throw new ApiError("The product service returned invalid JSON.");
  }
}
