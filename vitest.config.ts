import path from 'path'
import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import AutoImportFunctions from 'unplugin-auto-import/vite'
import AutoImportComponents from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    Vue(),
    AutoImportFunctions ({ imports: [
      'vue',
      'vee-validate',
      'vue-router',
      'pinia',
    ], dts: 'auto-imports.d.ts' }),
    AutoImportComponents({
      dirs: ['src/components'],
      dts: '.nuxt/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{vue,js,ts}'],
      all: false,
      reporter: ['html', 'clover', 'text', 'lcov'],
    },
    root: '.',
    globals: true,
    environment: 'happy-dom',
    reporters: ['verbose', 'vitest-sonar-reporter'],
    outputFile: 'test-report.xml',
    setupFiles: './src/tests/unitTest/setup.ts',
  },
})
