import "server-only";

type QueryValue = string | number | boolean | undefined;
type UnknownRecord = Record<string, unknown>;

const wordpressUrl = process.env.WORDPRESS_URL || process.env.NEXT_PUBLIC_WORDPRESS_URL;
const username = process.env.WORDPRESS_USERNAME;
const applicationPassword = process.env.WORDPRESS_APPLICATION_PASSWORD;
const cacheSeconds = Number(process.env.WORDPRESS_CACHE_SECONDS || 60);

const endpointOverrides: Record<string, string> = {
  cms_pages: "pages",
  cms_sections: "cms-sections",
  current_works: "current-works",
  service_providers: "service-providers"
};

function endpoint(contentType: string) {
  return endpointOverrides[contentType] || contentType.replaceAll("_", "-");
}

function apiUrl(path: string) {
  if (!wordpressUrl) throw new Error("WORDPRESS_URL is not configured");
  const base = wordpressUrl.endsWith("/") ? wordpressUrl : `${wordpressUrl}/`;
  return new URL(`wp-json/wp/v2/${path}`, base);
}

export function isWordPressConfigured() {
  return Boolean(wordpressUrl);
}

export function wordpressAssetUrl(value: unknown): string {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return "";
  const item = value as UnknownRecord;
  return String(item.source_url || item.url || item.guid || "");
}

function unwrap(item: UnknownRecord): UnknownRecord {
  const acf = item.acf && typeof item.acf === "object" ? item.acf as UnknownRecord : {};
  const meta = item.meta && typeof item.meta === "object" ? item.meta as UnknownRecord : {};
  const renderedTitle = item.title && typeof item.title === "object" ? (item.title as UnknownRecord).rendered : item.title;
  const renderedContent = item.content && typeof item.content === "object" ? (item.content as UnknownRecord).rendered : item.content;
  return {
    ...item,
    ...meta,
    ...acf,
    title: renderedTitle || acf.title || "",
    description: acf.description || renderedContent || "",
    created_at: item.date,
    updated_at: item.modified
  };
}

function authHeaders() {
  const headers = new Headers({ "Content-Type": "application/json" });
  if (username && applicationPassword) {
    headers.set("Authorization", `Basic ${Buffer.from(`${username}:${applicationPassword}`).toString("base64")}`);
  }
  return headers;
}

async function request<T>(path: string, init: RequestInit = {}) {
  const response = await fetch(apiUrl(path), {
    ...init,
    headers: authHeaders(),
    next: init.method ? undefined : { revalidate: cacheSeconds }
  });
  if (!response.ok) throw new Error(`WordPress request failed (${response.status}): ${await response.text()}`);
  return response.status === 204 ? undefined as T : await response.json() as T;
}

export async function wordpressReadItems<T>(contentType: string, query: Record<string, QueryValue> = {}): Promise<T[]> {
  const url = apiUrl(endpoint(contentType));
  url.searchParams.set("per_page", "100");
  if (query.sort) url.searchParams.set("orderby", String(query.sort).replace(/^-/, "").split(",")[0] === "updated_at" ? "modified" : "date");
  if (String(query.sort || "").startsWith("-")) url.searchParams.set("order", "desc");
  const records = await request<UnknownRecord[]>(`${endpoint(contentType)}?${url.searchParams.toString()}`);
  return records.map(unwrap) as T[];
}

function payload(data: UnknownRecord) {
  const { title, slug, status, ...fields } = data;
  return { title, slug, status: status === "published" ? "publish" : status || "draft", acf: fields };
}

export async function wordpressCreateItem<TPayload extends UnknownRecord, TResponse = unknown>(contentType: string, data: TPayload) {
  return unwrap(await request<UnknownRecord>(endpoint(contentType), { method: "POST", body: JSON.stringify(payload(data)) })) as TResponse;
}

export async function wordpressUpdateItem<TPayload extends UnknownRecord, TResponse = unknown>(contentType: string, id: string, data: TPayload) {
  return unwrap(await request<UnknownRecord>(`${endpoint(contentType)}/${id}`, { method: "POST", body: JSON.stringify(payload(data)) })) as TResponse;
}

export async function wordpressDeleteItem(contentType: string, id: string) {
  await request(`${endpoint(contentType)}/${id}`, { method: "DELETE" });
}

// Stable repository aliases keep the data layer independent from the CMS vendor.
export const cmsAssetUrl = wordpressAssetUrl;
export const cmsReadItems = wordpressReadItems;
export const cmsCreateItem = wordpressCreateItem;
export const cmsUpdateItem = wordpressUpdateItem;
export const cmsDeleteItem = wordpressDeleteItem;
export const isExternalCmsConfigured = isWordPressConfigured;
