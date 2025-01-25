import { db } from './config';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

async function main() {
  await migrate(db, { migrationsFolder: './drizzle' });
}

main();
