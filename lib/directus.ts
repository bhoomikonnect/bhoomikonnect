type DirectusQueryValue = string | number | boolean | undefined;

const directusUrl = process.env.DIRECTUS_URL || process.env.NEXT_PUBLIC_DIRECTUS_URL;
const directusToken = process.env.DIRECTUS_STATIC_TOKEN;

function getDirectusUrl(path: string) {
  if (!directusUrl) {
    throw new Error("DIRECTUS_URL is not configured");
  }

  return new URL(path, directusUrl.endsWith("/") ? directusUrl : `${directusUrl}/`);
}

export function isDirectusConfigured() {
  return Boolean(directusUrl);
}

export function directusAssetUrl(asset: unknown) {
  if (!asset) {
    return "";
  }

  if (typeof asset === "string") {
    if (asset.startsWith("http") || asset.startsWith("/")) {
      return asset;
    }

    return directusUrl ? getDirectusUrl(`assets/${asset}`).toString() : asset;
  }

  if (typeof asset === "object") {
    const record = asset as Record<string, unknown>;
    const nested = record.directus_files_id;

    if (typeof nested === "string") {
      return directusAssetUrl(nested);
    }

    if (nested && typeof nested === "object") {
      return directusAssetUrl((nested as Record<string, unknown>).id);
    }

    return directusAssetUrl(record.id || record.filename_disk || record.storage_path);
  }

  return "";
}

async function directusFetch<T>(path: string, init?: RequestInit & { query?: Record<string, DirectusQueryValue> }) {
  const url = getDirectusUrl(path);

  Object.entries(init?.query || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });

  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json");

  if (directusToken) {
    headers.set("Authorization", `Bearer ${directusToken}`);
  }

  const response = await fetch(url, {
    ...init,
    headers,
    next: init?.method && init.method !== "GET"
      ? undefined
      : { revalidate: Number(process.env.DIRECTUS_CACHE_SECONDS || 60) }
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Directus request failed (${response.status}): ${detail}`);
  }

  return response.json() as Promise<T>;
}

export async function directusReadItems<T>(
  collection: string,
  query: Record<string, DirectusQueryValue> = {}
) {
  const response = await directusFetch<{ data: T[] }>(`items/${collection}`, {
    query: {
      limit: -1,
      ...query
    }
  });

  return response.data;
}

export async function directusReadItem<T>(
  collection: string,
  query: Record<string, DirectusQueryValue> = {}
) {
  const items = await directusReadItems<T>(collection, {
    limit: 1,
    ...query
  });

  return items[0] || null;
}

export async function directusCreateItem<TPayload extends Record<string, unknown>, TResponse = unknown>(
  collection: string,
  payload: TPayload
) {
  const response = await directusFetch<{ data: TResponse }>(`items/${collection}`, {
    method: "POST",
    body: JSON.stringify(payload)
  });

  return response.data;
}

export async function directusUpdateItem<TPayload extends Record<string, unknown>, TResponse = unknown>(
  collection: string,
  id: string,
  payload: TPayload
) {
  const response = await directusFetch<{ data: TResponse }>(`items/${collection}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload)
  });

  return response.data;
}

export async function directusDeleteItem(collection: string, id: string) {
  await directusFetch(`items/${collection}/${id}`, { method: "DELETE" });
}
