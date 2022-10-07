module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname, 
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "@typescript-eslint/ban-tslint-comment": "warn",
    "@typescript-eslint/ban-ts-comment": "error",
    "@typescript-eslint/ban-types": "error",
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/no-unused-vars": ["warn", {
      'vars': 'all',
      'args': 'all'
    }],
    "@typescript-eslint/no-unused-expressions": "warn",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        'selector': ['variable', 'function', 'parameter', 'classProperty', 'classMethod'],
        'format': ['camelCase']
      },
      {
        'selector': ['class', 'interface'],
        'format': ['PascalCase']
      },
      {
        'selector': ['objectLiteralProperty'],
        'format': ['camelCase', 'snake_case', 'PascalCase']
      }
    ]
  },
};
