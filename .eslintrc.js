module.exports = {
  env: {
    browser: true,
    es2021: true,
    jquery: true,
    commonjs: true,
  },
  extends: {"eslint:recommended", "plugin:cypress/recommended"},
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
};
