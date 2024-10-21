import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    ignores: ['src/components/icons/', 'src/api/']
  },
  eslint.configs.recommended,
  {
    files: ['src/**/*.{js,ts,jsx,tsx,vue}'],
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.app.json'
        },
        node: {
          project: './tsconfig.node.json'
        }
      }
    },
    languageOptions: {
      ecmaVersion: 'latest'
    },
  },
  ...tsEslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx,vue}'],
    languageOptions: {
      parser: tsEslint.parser
    }
  },
  prettierConfig
];
