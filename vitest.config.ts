import path from 'path'
import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    Vue(),
    AutoImport({
      imports: ['vue', 'vue-router']
    })
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    coverage: {
      provider: 'c8',
      include: ['src/**/*.{vue,js,ts}'],
      all: false,
      reporter: ['html', 'clover', 'text']
    },
    root: '.',
    globals: true,
    environment: 'happy-dom',
    reporters: ['verbose', 'vitest-sonar-reporter'],
    outputFile: 'test-report.xml',
    setupFiles: './src/tests/unitTest/setup.ts'
  }
})
