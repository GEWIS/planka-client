import type { CreateClientConfig } from './generated/client.gen';

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: config?.baseUrl ?? '/api',
});
