import pluginJs from '@eslint/js';

import globals from 'globals';

import { pluginImport, configPrettier } from '../plugins';

import type { FlatESLintConfig } from 'eslint-define-config';

export const base = [
  {
    files: ['**/*.{js,cjs,mjs,jsx,ts,tsx}'],
    ignores: [
      '**/node_modules/**/*',
      '**/build/**/*',
      '**/coverage/**/*',
      '**/dist/*',
      '**/.next/**/*',
      '**/*.d.ts',
    ],
    plugins: {
      import: pluginImport,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
      },
      globals: {
        ...globals.es2021,
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      'import-x/named': 'off',
      'no-unused-vars': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [{ group: 'internal', pattern: '{{@,~}/,#}**' }],
          pathGroupsExcludedImportTypes: ['type'],
        },
      ],
    },
  },
  configPrettier,
] as FlatESLintConfig[];
