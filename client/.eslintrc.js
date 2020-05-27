module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "arrow-body-style": 0,
    "import/prefer-default-export": 0,
    "@typescript-eslint/no-inferrable-types": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "spaced-comment": ["warn", "always"]
  },
};
