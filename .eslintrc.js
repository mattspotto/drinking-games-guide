module.exports = {
  'extends': 'airbnb',
  'parser': 'babel-eslint',
  'env': {
    'jest': true,
  },
  'rules': {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'import/prefer-default-export': 'off',
    'camelcase': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'arrow-parens': 'off',
    'global-require': 'off',
  },
  'globals': {
    "fetch": false
  }
}
