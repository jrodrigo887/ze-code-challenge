/// <reference types="vitest" />

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { alias } from './alias';

export default defineConfig({
  plugins: [
    Vue(),
  ],
  define: {
    "import.meta.vitest": "undefined",
  },
  resolve: {
    alias,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    includeSource: ['test/**/*.{js,ts,vue}'],
  },
})