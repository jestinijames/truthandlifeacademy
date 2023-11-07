// Export the ESLint configuration object.
module.exports = {
  // Define the environments where your scripts are designed to run.
  env: {
    browser: true, // Allows global variables for browsers.
    es2020: true, // Allows ES2020 global variables and ES2020 style.
  },

  // Define the files and/or directories ESLint will ignore.
  ignorePatterns: ["node_modules/*"],

  // Extend specific configuration settings from various plugins and preset configurations.
  extends: [
    "eslint:recommended", // The recommended rules from ESLint.
    "plugin:import/errors", // Enable error rules from eslint-plugin-import.
    "plugin:import/warnings", // Enable warning rules from eslint-plugin-import.
    "plugin:import/typescript", // Enable TypeScript rules from eslint-plugin-import.
    "plugin:@typescript-eslint/recommended-type-checked", // Enable recommended rules from @typescript-eslint that require type-checking.
    "plugin:@typescript-eslint/strict-type-checked", // Enable strict rules from @typescript-eslint that require type-checking.
    "plugin:react/jsx-runtime", // Enable rules from eslint-plugin-react for the new JSX runtime.
    "plugin:react/recommended", // Enable recommended rules from eslint-plugin-react.
    "plugin:react-hooks/recommended", // Enable recommended rules from eslint-plugin-react-hooks.
    "plugin:prettier/recommended", // Enable recommended rules from prettier, also enables eslint-plugin-prettier and eslint-config-prettier.
    "plugin:testing-library/react", // Enable rules from eslint-plugin-testing-library for React.
    "plugin:jest-dom/recommended", // Enable rules from eslint-plugin-jest-dom.
    "plugin:jsx-a11y/recommended", // Enable recommended rules from eslint-plugin-jsx-a11y.
    "plugin:storybook/recommended", // Enable recommended rules from eslint-plugin-storybook.
    "prettier", // Enables prettier rules.
  ],

  // Define the parser that ESLint will use.
  parser: "@typescript-eslint/parser", // Use the parser from @typescript-eslint/parser. This allows ESLint to understand TypeScript syntax.

  // Define options for the parser.
  parserOptions: {
    ecmaVersion: "2020", // Specify the version of ECMAScript syntax you want to use.
    jsxPragma: null, // Specifies the JSX pragma to be used.
    project: true, // Enables project-wide linting by including a project configuration file.
    sourceType: "module", // Specify that your code is written in ECMAScript modules.
  },

  // Specify additional plugins.
  plugins: [
    "@typescript-eslint",
    "import",
    "prettier",
    "no-relative-import-paths",
    "react",
    "react-hooks",
    "react-refresh",
    "storybook",
  ],

  // Define the rules for your project.
  rules: {
    // Enforce a particular style for line endings.
    "linebreak-style": ["error", "unix"],

    "jsx-a11y/anchor-is-valid": "off", // TODO: turn this one back on later

    // Disallow relative import paths.
    "no-relative-import-paths/no-relative-import-paths": [
      "error",
      {allowSameFolder: false, prefix: "@"},
    ],

    // Enforce that every React Hook is accompanied by a dependency array.
    "react-hooks/exhaustive-deps": "error",

    // Enforce props sorting in JSX.
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: true,
        shorthandLast: true,
        multiline: "last",
        noSortAlphabetically: true,
        reservedFirst: true,
      },
    ],

    // Prevent missing displayName in a React component definition.
    "react/display-name": "error",

    // Prevent usage of dangerous JSX properties.
    "react/no-danger": "error",

    // Prevent usage of unknown DOM property.
    "react/no-unknown-property": "error",

    // Prevent missing parentheses around multilines JSX.
    "react/self-closing-comp": "error",

    // Prevent missing props validation in a React component definition.
    "react/prop-types": "off", // We turn off prop-types rule, as we will use TypeScript's types instead.

    // Prevent invalid characters from appearing in markup.
    "react/no-unescaped-entities": "off", // Turn this one off after we do the marketing copy

    // Prevent React to be incorrectly marked as unused.
    "react/react-in-jsx-scope": "off", // Do not require React to be in scope for JSX

    // Enforce component to be exported if it's the only component in a file.
    "react-refresh/only-export-components": "off", // TODO: turn this one back on later, extra fun

    // Enforces consistent usage of type imports.
    "@typescript-eslint/consistent-type-imports": "error",



    // Avoid using promises in places not designed to handle them.
    "@typescript-eslint/no-misused-promises": "off", // TODO: turn this one back on later, spend your day here!
  },

  // Define shared settings.
  settings: {
    // Automatically detects the React version.
    react: {
      version: "detect",
    },

    "import/parsers": {
      // Define the parser to be used for .ts and .tsx files.
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },

    "import/resolver": {
      // Use a custom import resolver.
      "eslint-import-resolver-custom-alias": {
        alias: {
          "@": "./src",
        },
        extensions: [".ts", ".tsx"],
      },

      // Use a TypeScript resolver.
      typescript: {
        alwaysTryTypes: true, // Always try to resolve types.
        project: "./tsconfig.json", // Path to the tsconfig.json file.
      },
    },
  },
};
