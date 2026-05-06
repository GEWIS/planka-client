import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: './swagger/swagger.json',
  output: {
    path: './src/generated',
    postProcess: ['prettier'],
  },
  plugins: [
    {
      name: '@hey-api/client-fetch',
      runtimeConfigPath: './src/runtime-config',
    },
    {
      name: '@hey-api/sdk',
      operations: {
        strategy: 'flat',
      },
    },
    {
      name: '@hey-api/typescript',
      enums: 'typescript',
    },
  ],
});
