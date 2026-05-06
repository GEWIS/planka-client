# 🚀 Planka Client

![npm version](https://img.shields.io/npm/v/@gewis/planka-client) ![License](https://img.shields.io/github/license/GEWIS/planka-client) ![Build Status](https://img.shields.io/github/actions/workflow/status/GEWIS/planka-client/lint-and-build.yaml)

TypeScript client for the [Planka](https://github.com/plankanban/planka) v2 REST API, generated from its OpenAPI specification with [openapi-ts](https://heyapi.dev/openapi-ts).

> **v2.x targets Planka v2.x.** For Planka v1.x use `@gewis/planka-client@^1`.

See [PlankAPI](https://github.com/gewis/plankapi) for an example consumer.

## Installation

```sh
npm install @gewis/planka-client
# or
yarn add @gewis/planka-client
```

## Usage

The base URL must include the `/api` path segment.

### Bearer token (username + password)

```ts
import { client, createAccessToken, getProjects, withBearerToken } from '@gewis/planka-client';

client.setConfig({ baseUrl: 'https://planka.example.com/api' });

const { data } = await createAccessToken({
  body: { emailOrUsername: 'demo', password: 'demo' },
});
const token = data!.item;

client.setConfig({
  baseUrl: 'https://planka.example.com/api',
  ...withBearerToken(token),
});

const { data: projects } = await getProjects();
```

### API key

Planka v2 supports per-user API keys (sent as `X-Api-Key`). Mint one with `createUserApiKey`, then authenticate with `withApiKey`:

```ts
import { client, createUserApiKey, withApiKey, withBearerToken } from '@gewis/planka-client';

// First-time only: mint the key with bearer auth
client.setConfig({ baseUrl: 'https://planka.example.com/api', ...withBearerToken(token) });
const { data } = await createUserApiKey({ path: { id: userId } });
const apiKey = data!.included.apiKey; // <-- shown only once, store it

// Subsequent requests: authenticate with the key
client.setConfig({ baseUrl: 'https://planka.example.com/api', ...withApiKey(apiKey) });
```

The full API key is returned **only once** by `createUserApiKey`; persist it immediately.

## Updating the OpenAPI spec

The spec is pinned at [`swagger/swagger.json`](swagger/swagger.json). To pull a newer revision and regenerate the client:

```sh
yarn update-swagger     # downloads the latest swagger.json from plankanban/planka (gh-pages)
yarn generate           # regenerates src/generated from swagger/swagger.json
yarn build              # type-check + bundle
```

`update-swagger` defaults to the canonical raw URL but accepts `PLANKA_SWAGGER_URL=...` to point at a fork or local file server.

## Testing

The smoke tests exercise both auth flows against a real Planka instance.

```sh
docker compose up -d
yarn test
```

Override the target with `PLANKA_URL=https://example.com/api yarn test`.

## License

GNU Affero General Public License v3.0 — see [LICENSE.txt](LICENSE.txt).

## Contributing

Contributions are welcome! Open an issue or PR.
