import path from 'path'
import type { StorybookConfig } from '@storybook/vue3-vite'
import AutoImportFunctions from 'unplugin-auto-import/vite'
import AutoImportComponents from 'unplugin-vue-components/vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  staticDirs: ['../public'],
  viteFinal: async (config) => {
    if (config?.resolve?.alias) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src'),
        '~': path.resolve(__dirname, '../src'),
      }
    }
    if (config?.plugins) {
      config.plugins.push(
        AutoImportFunctions ({ imports: [
          'vue',
          'vee-validate',
          'vue-router',
          'pinia',
        ], dts: '.storybook/auto-imports.d.ts' }),
      )
      config.plugins.push(
        AutoImportComponents({
          dirs: ['src/components'],
          dts: '.storybook/components.d.ts',
        }),
      )
    }
    return config
  },
}
export default config
