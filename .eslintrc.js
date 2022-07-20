module.exports = {
  plugins: ['jest', '@typescript-eslint'],
  extends: ['vtex'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './tsconfig.test.json']
  },
  rules: {},
  env: {
    node: true,
    es6: true,
    'jest/globals': true
  }
}
