import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    ignores: ['**/*.log*', '.nitro/**', '.cache/**', '.env/**', 'coverage/**', '.scannerwork/**'],
    rules: {
      'no-console': 'off',
    },
  },
)
