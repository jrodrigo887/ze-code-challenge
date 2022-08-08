import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { alias } from './alias';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

 
  optimizeDeps: {
    include: [
      '@apollo/client/core',
      '@apollo/client/cache',
      '@apollo/client/link/ws',
      '@apollo/client/link/context',
      '@apollo/client/utilities'
    ],
    exclude: ['@vue/apollo-composable', 'test-components']
  },
  build: {
    rollupOptions: {
      external: ['react', 'subscriptions-transport-ws', '@vue/apollo-composable']
    }
  },
  resolve: {
    alias,
  }
})