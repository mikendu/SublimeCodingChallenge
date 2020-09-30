module.exports = {
  extends: ['airbnb-typescript/base'],
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    node: true,
  },
  rules: {
    '@typescript-eslint/no-floating-promises': 'error',
    'object-curly-spacing': ['error', 'always'],
  },
  overrides:[],
};
