module.exports = {
  extends: ['airbnb-typescript/base'],
  parserOptions: {
    project: './tsconfig.json'
  },
  env: {
    node: true,
  },
  rules: {
    '@typescript-eslint/no-floating-promises': 'error',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'object-curly-spacing': ['error', 'always'],
  },
  overrides:[],
};
