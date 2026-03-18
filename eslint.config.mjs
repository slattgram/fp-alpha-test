import path from 'node:path';

import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import { configs, plugins } from 'eslint-config-airbnb-extended';
import { rules as prettierConfigRules } from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import angularPlugin from '@angular-eslint/eslint-plugin';
import angularTemplatePlugin from '@angular-eslint/eslint-plugin-template';
import templateParser from '@angular-eslint/template-parser';

const gitignorePath = path.resolve('.', '.gitignore');

const jsConfig = defineConfig([
  // ESLint recommended config
  {
    name: 'js/config',
    ...js.configs.recommended,
  },
  // Stylistic plugin
  plugins.stylistic,
  // Import X plugin
  plugins.importX,
  // Airbnb base recommended config
  ...configs.base.recommended,
]);

const nodeConfig = defineConfig([
  // Node plugin
  plugins.node,
  // Airbnb Node recommended config
  ...configs.node.recommended,
]);

const typescriptConfig = defineConfig([
  // TypeScript ESLint plugin
  plugins.typescriptEslint,
  // Airbnb base TypeScript config
  ...configs.base.typescript,
  // Angular TypeScript configuration
  {
    name: 'angular/typescript',
    files: ['**/*.ts'],
    plugins: {
      '@angular-eslint': angularPlugin,
    },
    rules: {
      'import-x/prefer-default-export': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^err$',
          varsIgnorePattern: '^err$',
          caughtErrorsIgnorePattern: '^err$',
        },
      ],
    },
  },
]);

const prettierConfig = defineConfig([
  // Prettier plugin
  {
    name: 'prettier/plugin/config',
    plugins: {
      prettier: prettierPlugin,
    },
  },
  // Prettier config
  {
    name: 'prettier/config',
    rules: {
      ...prettierConfigRules,
      'prettier/prettier': 'error',
    },
  },
]);

const angularTemplateConfig = defineConfig([
  // Angular HTML template configuration
  {
    name: 'angular/template',
    files: ['**/*.html'],
    languageOptions: {
      parser: templateParser,
    },
    plugins: {
      '@angular-eslint/template': angularTemplatePlugin,
    },
    rules: {
      ...angularTemplatePlugin.configs.recommended.rules,
      '@angular-eslint/template/attributes-order': [
        'error',
        {
          order: [
            'STRUCTURAL_DIRECTIVE',
            'TEMPLATE_REFERENCE',
            'ATTRIBUTE_BINDING',
            'INPUT_BINDING',
            'TWO_WAY_BINDING',
            'OUTPUT_BINDING',
          ],
          alphabetical: false,
        },
      ],
    },
  },
]);

export default defineConfig([
  // Ignore files and folders listed in .gitignore
  includeIgnoreFile(gitignorePath),
  // JavaScript config
  ...jsConfig,
  // Node config
  ...nodeConfig,
  // TypeScript config
  ...typescriptConfig,
  // Prettier config
  ...prettierConfig,
  // Angular template config
  ...angularTemplateConfig,
  // Override rules
  {
    name: 'overrides/unsupported-features',
    rules: {
      'n/no-unsupported-features/node-builtins': 'off',
      'no-underscore-dangle': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/naming-convention': 'off',
      'class-methods-use-this': 'off',
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^err$',
          varsIgnorePattern: '^err$',
          caughtErrorsIgnorePattern: '^err$',
        },
      ],
    },
  },
]);
