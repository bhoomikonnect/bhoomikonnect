import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { LocalCmsStore } from "@/types/cms";

const storePath = path.join(process.cwd(), "data", "local-cms.json");
const emptyStore: LocalCmsStore = { properties: [], deleted_property_slugs: [], pages: [] };
let writeQueue: Promise<unknown> = Promise.resolve();

export async function readLocalCmsStore(): Promise<LocalCmsStore> {
  try {
    const value = JSON.parse(await fs.readFile(storePath, "utf8")) as Partial<LocalCmsStore>;
    return {
      properties: Array.isArray(value.properties) ? value.properties : [],
      deleted_property_slugs: Array.isArray(value.deleted_property_slugs) ? value.deleted_property_slugs : [],
      pages: Array.isArray(value.pages) ? value.pages : []
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return structuredClone(emptyStore);
    throw error;
  }
}

export async function updateLocalCmsStore<T>(mutator: (store: LocalCmsStore) => T | Promise<T>): Promise<T> {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Local CMS writes are disabled in production. Configure Directus for production content management.");
  }

  let result!: T;
  writeQueue = writeQueue.then(async () => {
    const store = await readLocalCmsStore();
    result = await mutator(store);
    await fs.mkdir(path.dirname(storePath), { recursive: true });
    const temporaryPath = `${storePath}.tmp`;
    await fs.writeFile(temporaryPath, `${JSON.stringify(store, null, 2)}\n`, "utf8");
    await fs.rename(temporaryPath, storePath);
  });
  await writeQueue;
  return result;
}
