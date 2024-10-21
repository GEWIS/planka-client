# planka-client
Simple client for Trello generated from the Trello openapi specification using openapi-ts.

# Usage
1. Add the following dependency to `package.json`.

```json
{
  "dependencies": {
    "@gewis/planka-client": "github:GEWIS/planka-client"
  }
}
```

2. Import the desired service and call the desired endpoint. [Heyapi](https://heyapi.dev/openapi-ts/clients/fetch.html#fetch-api)
provides more information on how to use the client.

```typescript
import { client, authorize } from '@gewis/planka-client';

client.setConfig({
  baseUrl: 'https://example.com',
})

/** Fetch access token with `authorize` or `authorizeOidc` */
const accessToken = authorize(...)

client.setConfig({
  baseUrl: 'https://example.com',
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
})
```

# Testing
To test the client locally; you can use the included `docker-compose.yml`. Simply run `docker compose up -d` to start a
local instance of planka, to which you can login with username `demo` and password `demo`.