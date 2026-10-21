import { promises as fs } from "fs";

type CacheEntry = {
  mtimeMs: number;
  size: number;
  data: unknown;
};

const cache = new Map<string, CacheEntry>();

/**
 * Reads and parses a JSON file, reusing the parsed value while the file on disk
 * is unchanged.
 *
 * The content files under `data/` are large (blog content alone is tens of MB),
 * so re-parsing them on every request dominated the response time of the blog,
 * footer and services pages.
 */
export async function readJsonFile<T>(filePath: string): Promise<T | null> {
  try {
    const stat = await fs.stat(filePath);
    const cached = cache.get(filePath);
    if (cached && cached.mtimeMs === stat.mtimeMs && cached.size === stat.size) {
      return cached.data as T;
    }

    const raw = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(raw) as T;
    cache.set(filePath, { mtimeMs: stat.mtimeMs, size: stat.size, data });
    return data;
  } catch {
    return null;
  }
}

/** Drops the cached parse for a file so the next read hits disk again. */
export function invalidateJsonFile(filePath: string): void {
  cache.delete(filePath);
}
