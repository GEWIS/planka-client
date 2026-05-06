import type { Auth } from './generated/core/auth.gen';

export type AuthCallback = (auth: Auth) => string | undefined;

/**
 * Provide a bearer token (JWT) obtained from `createAccessToken`.
 *
 * Spread into `client.setConfig({ ... })` or pass as the `auth` option.
 *
 * @example
 *   client.setConfig({ baseUrl: '...', ...withBearerToken(token) });
 */
export const withBearerToken = (token: string): { auth: AuthCallback } => ({
  auth: (auth) => (auth.type === 'http' && auth.scheme === 'bearer' ? token : undefined),
});

/**
 * Provide a Planka API key (sent as `X-Api-Key` header). Mint one with
 * `createUserApiKey`.
 *
 * @example
 *   client.setConfig({ baseUrl: '...', ...withApiKey(apiKey) });
 */
export const withApiKey = (apiKey: string): { auth: AuthCallback } => ({
  auth: (auth) => (auth.type === 'apiKey' ? apiKey : undefined),
});
