import path from 'path'
import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import AutoImportFunctions from 'unplugin-auto-import/vite'
import AutoImportComponents from 'unplugin-vue-components/vite'
import storybookTest from '@storybook/addon-vitest/vitest-plugin'
import { storybookVuePlugin } from '@storybook/vue3-vite/vite-plugin'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{vue,js,ts}'],
      all: false,
      reporter: ['html', 'clover', 'text', 'lcov'],
    },
    reporters: ['verbose', 'vitest-sonar-reporter'],
    outputFile: 'test-report.xml',
    projects: [
      {
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
          name: 'nuxt-test',
          root: '.',
          globals: true,
          environment: 'happy-dom',
          setupFiles: './src/tests/unitTest/setup.ts',
        },
      },
      {
        plugins: [
          Vue(),
          // See options at: https://storybook.js.org/docs/writing-tests/vitest-plugin#storybooktest
          storybookTest({ configDir: '.storybook' }),
          storybookVuePlugin(),
          AutoImportFunctions({
            imports: ['vue', 'vee-validate', 'vue-router', 'pinia'],
            dts: '.storybook/auto-imports.d.ts',
          }),
          AutoImportComponents({
            dirs: ['src/components'],
            dts: '.storybook/components.d.ts',
          }),
        ],
        resolve: {
          alias: {
            '~': path.resolve(__dirname, './src'),
            '@': path.resolve(__dirname, './src'),
          },
        },
        test: {
          name: 'storybook-test',
          browser: {
            enabled: true,
            headless: true,
            // @deprecated — use instances instead.
            // name: 'chromium',
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          // environment: 'happy-dom',
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
})
