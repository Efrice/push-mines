import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
  },
  {
    ignores: [
      'docs/**/*',
      'public/**/*',
      '*.d.ts',
      'README.md',
      '*.json',
      'index.html',
    ],
  },
)
