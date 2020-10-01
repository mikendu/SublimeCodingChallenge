module.exports = {
  extends: 'standard-with-typescript',
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
    '@typescript-eslint/space-before-function-paren': 'off',
    'object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'semi': 'off',
    '@typescript-eslint/semi': ['error', 'always'],
  },
  overrides:[],
};
