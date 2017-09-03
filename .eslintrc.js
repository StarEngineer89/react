module.exports = {
  "parser": "babel-eslint",
  "plugins": [ "react" ],
  "parserOptions": {
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "jsx": true
    },
    "sourceType": "module"
  },
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "ecmaFeatures": {
    "arrowFunctions": true,
    "blockBindings": true,
    "classes": true,
    "defaultParams": true,
    "destructuring": true,
    "forOf": true,
    "generators": true,
    "modules": true,
    "spread": true,
    "templateStrings": true,
    "jsx": true
  },
  "rules": {
    // "no-unused-vars": [1],
    "react/jsx-no-undef": 1,
    "no-undef": [2],
    "no-use-before-define": [2, "nofunc"],
    "complexity": [2, 10],
    "max-depth": [1, 4],
    "curly": [0],
    "eqeqeq": [2, "smart"],
    "new-cap": [1],
    "no-new": [1],
    "no-plusplus": [0],
    "no-trailing-spaces": [2, { "skipBlankLines": true }],
    "camelcase": [2, {"properties": "never"}],
    "semi": [0],
    "no-multiple-empty-lines": [1, {"max": 1}]
  }
}
