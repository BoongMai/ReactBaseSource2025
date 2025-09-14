// @ts-check
import js from '@eslint/js';
import preferArrow from 'eslint-plugin-prefer-arrow';
import ts from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      'prefer-arrow': preferArrow,
    },
    rules: {
      // Basic rules only - not too strict
      'prefer-const': 'warn',
      'no-var': 'warn',
      'no-console': 'off',
      'no-debugger': 'warn',
      'no-unused-vars': 'off',

      // TypeScript rules - relaxed
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',

      // Arrow functions - optional
      'prefer-arrow/prefer-arrow-functions': 'off',
      'func-style': 'off',

      // Import rules - relaxed
      'no-restricted-imports': 'off',

      // React rules - basic only (removed react-hooks rule)
    },
  },
];
