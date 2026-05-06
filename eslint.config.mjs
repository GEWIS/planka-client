import { eslintConfig as common } from '@gewis/eslint-config-typescript';
import { eslintConfig as prettier } from '@gewis/prettier-config';

export default [
  { ignores: ['src/generated/**', 'dist/**'] },
  ...common,
  prettier,
];
