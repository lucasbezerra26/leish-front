import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import pluginVitest from '@vitest/eslint-plugin';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/assets/**'], // Ignora a pasta assets
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },
  skipFormatting,

  // Regras adicionais para Vue e multi-word components
  {
    files: ['**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off', // Desativa nomes multi-word para componentes Vue
      'vue/no-reserved-component-names': 'off', // Permite nomes reservados
    },
  },
];
