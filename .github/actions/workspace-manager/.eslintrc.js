module.exports = {
  root: true,
  extends: 'vtex',
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
}
