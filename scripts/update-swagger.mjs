#!/usr/bin/env node
/**
 * Fetch the latest Planka OpenAPI spec and write it to ./swagger/swagger.json.
 *
 * Source: https://github.com/plankanban/planka  (gh-pages branch)
 * After updating, run `yarn generate` to regenerate the client.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SOURCE_URL =
  process.env.PLANKA_SWAGGER_URL ??
  'https://raw.githubusercontent.com/plankanban/planka/gh-pages/swagger-ui/swagger.json';

const here = dirname(fileURLToPath(import.meta.url));
const outFile = resolve(here, '..', 'swagger', 'swagger.json');

const res = await fetch(SOURCE_URL);
if (!res.ok) {
  console.error(`Failed to fetch ${SOURCE_URL}: ${res.status} ${res.statusText}`);
  process.exit(1);
}

const text = await res.text();
const spec = JSON.parse(text);
await mkdir(dirname(outFile), { recursive: true });
await writeFile(outFile, JSON.stringify(spec, null, 2) + '\n');

console.log(`Wrote ${outFile}`);
console.log(`  openapi: ${spec.openapi}`);
console.log(`  info.title: ${spec.info?.title}`);
console.log(`  info.version: ${spec.info?.version}`);
console.log(`  paths: ${Object.keys(spec.paths ?? {}).length}`);
console.log('');
console.log('Next: yarn generate');
