# 🚀 Planka Client 
![npm version](https://img.shields.io/npm/v/@gewis/planka-client) ![License](https://img.shields.io/github/license/GEWIS/planka-client) ![Build Status](https://img.shields.io/github/actions/workflow/status/GEWIS/planka-client/lint-and-build.yaml)


A simple client for [Planka](https://github.com/plankanban/planka) generated from its OpenAPI specification using [openapi-ts](https://heyapi.dev/openapi-ts/).

See [PlankAPI](https://github.com/gewis/plankapi) for an implementation using this client.

## Installation

Add the following dependency to your `package.json`:

```sh
npm install @gewis/planka-client
```

or using Yarn:

```sh
yarn add @gewis/planka-client
```

## 📦 Usage

Import the desired service and call the required endpoint. Check out [Heyapi](https://heyapi.dev/openapi-ts/clients/fetch.html#fetch-api) for more details.

```typescript
import { client, authorize } from '@gewis/planka-client';

client.setConfig({
  baseUrl: 'https://example.com',
});

/** Fetch access token with `authorize` or `authorizeOidc` */
const accessToken = authorize(...);

client.setConfig({
  baseUrl: 'https://example.com',
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
});
```

## 🧪 Testing

1. Start Planka with:

```sh
docker compose up -d
```

2. Run tests:

```sh
yarn test
```

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## 🌟 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
