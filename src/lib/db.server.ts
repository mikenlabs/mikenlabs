import { neon } from "@neondatabase/serverless";

function createDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("Missing DATABASE_URL environment variable");
  }
  return neon(url);
}

let _db: ReturnType<typeof createDb> | undefined;

export function getDb() {
  if (!_db) _db = createDb();
  return _db;
}

export async function query(sql: string, params?: any[]) {
  const db = getDb();
  if (params && params.length > 0) {
    return await db(sql, ...params);
  }
  return await db(sql);
}
