import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export type Database = ReturnType<typeof drizzle<typeof schema>>;

export function createDb(d1: unknown) {
  return drizzle(d1 as Parameters<typeof drizzle>[0], { schema });
}

export * from './schema';
