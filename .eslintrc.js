module.exports = {
  env: {
    commonjs: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:security/recommended",
    "plugin:mocha/recommended"
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "no-unused-vars": "warn",
    "no-var": "error",
    "no-console": "warn",
    "no-debugger": "error",
    "no-plusplus": "off",
    "no-shadow": "off",
    "vars-on-top": "off",
    "no-underscore-dangle": "off", // var _foo;
    "func-names": "off", // setTimeout(function () {}, 0);
    "prefer-template": "off",
    "no-nested-ternary": "off",
    "max-classes-per-file": "off",
    "consistent-return": "off",
    "no-restricted-syntax": ["off", "ForOfStatement"], // disallow specified syntax(ex. WithStatement)
    "prefer-arrow-callback": "off", // Require using arrow functions for callbacks
    "require-await": "error",
    "arrow-parens": ["error", "as-needed"], // a => {}
    "no-param-reassign": ["error", { props: false }],
    "no-unused-expressions": [
      "error",
      {
        allowTernary: true, // a || b
        allowShortCircuit: true, // a ? b : 0
        allowTaggedTemplates: true,
      }
    ],
    indent: ["error", 2, { SwitchCase: 1 }],
    semi: ["error", "always"],
    "comma-dangle": [
      "error",
      {
        arrays: "never",
        functions: "never",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
      }
    ],
    "eol-last": ["error", "always"],
    "key-spacing": [
      "error",
      {
        beforeColon: false,
        afterColon: true,
      }
    ],
    "object-curly-spacing": [2, "always"],
    "keyword-spacing": "error",
    "no-multiple-empty-lines": "warn",
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always",
      }
    ],
    "mocha/no-skipped-tests": "error",
    "mocha/no-exclusive-tests": "error",
  },
};
