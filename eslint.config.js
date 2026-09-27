import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // Scratch output — `dist`/`dist-ssr` are Vite bundles, `.tmp-ssr` and
  // `scripts/.tmp-*` are throwaway SSR render harnesses. They carry no lint
  // value, and their *compiled* JS trips rules that are meaningless in source
  // (e.g. react-hooks/refs on `jsx("div", { ref })`), which broke CI once.
  // ESLint does not read .gitignore, so they have to be listed here as well.
  globalIgnores(['dist', 'dist-ssr', '.tmp-ssr', 'scripts/.tmp-*']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])
