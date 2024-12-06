module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "eslint-config-prettier",
    "prettier"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "vite.config.js"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "prettier"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/prop-types": "off",
    "new-cap": 2,
    "no-case-declarations": 0,
    "react/no-children-prop": "off",
    "no-unused-vars": [
      "error",
      {
        "args": "none"
      }
    ],
    "react/display-name": "off",
    "react/no-unescaped-entities": "off",
    "prettier/prettier": [
      "error",
      {
        arrowParens: "always",
        trailingComma: "es5",
        tabWidth: 2,
        endOfLine: "auto",
        useTabs: true,
        singleQuote: false,
        printWidth: 120,
        jsxSingleQuote: false 
      }
    ]
  },
  "globals": {
    "arguments": true
  },
};
