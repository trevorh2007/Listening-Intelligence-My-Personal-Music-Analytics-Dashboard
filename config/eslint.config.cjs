const js = require('@eslint/js');
const typescript = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const prettier = require('eslint-config-prettier');
const jestDom = require('eslint-plugin-jest-dom');
const prettierPlugin = require('eslint-plugin-prettier');
const testingLibrary = require('eslint-plugin-testing-library');
const reactPlugin = require('eslint-plugin-react');

module.exports = [
  // Base configuration
  js.configs.recommended,

  // Global configuration for all files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      prettier: prettierPlugin,
      'testing-library': testingLibrary,
      'jest-dom': jestDom,
      react: reactPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Prettier integration
      'prettier/prettier': 'error',

      // Code Quality Rules (2025 Best Practices)
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-alert': 'warn',
      'no-unused-vars': 'off', // Using TypeScript version instead
      '@typescript-eslint/no-unused-vars': 'error',

      // React Best Practices
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'warn',
      'react/jsx-fragments': ['error', 'syntax'],
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' },
      ],
      'react/self-closing-comp': 'error',

      // Modern JavaScript (ES2025)
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-template': 'error',

      // Performance & Security
      'no-await-in-loop': 'warn',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',

      // Testing Best Practices
      'testing-library/await-async-queries': 'error',
      'testing-library/no-await-sync-queries': 'error',
      'testing-library/no-debugging-utils': 'warn',
      'testing-library/prefer-screen-queries': 'error',
    },
  },

  // Test files specific configuration
  {
    files: ['**/__tests__/**/*', '**/*.{test,spec}.*', 'config/jest/*.cjs'],
    languageOptions: {
      globals: {
        jest: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
      },
    },
    rules: {
      // Allow console in tests for debugging
      'no-console': 'off',
      // Allow require in jest config files
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  // Prettier configuration (must be last to override other configs)
  prettier,

  // Ignore patterns
  {
    ignores: [
      'node_modules/**',
      'out/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'config/eslint.config.js', // Don't lint the config file itself
      'config/jest/*.cjs', // Don't lint jest configs
    ],
  },

  // Node.js globals for config and Vite files
  {
    files: [
      'vite.config.*',
      'config/**/*.js',
      'config/**/*.cjs',
      'config/**/*.ts',
    ],
    languageOptions: {
      globals: {
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
        exports: 'readonly',
      },
    },
  },

  // Browser globals for React entry
  {
    files: ['src/main.tsx'],
    languageOptions: {
      globals: {
        document: 'readonly',
        window: 'readonly',
      },
    },
  },
];
