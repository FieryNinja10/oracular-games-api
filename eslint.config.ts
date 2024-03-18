// eslint.config.ts
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");

const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = {
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    eslintPluginPrettierRecommended,
  ],
};
