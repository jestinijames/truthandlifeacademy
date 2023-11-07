/** @type {import("prettier").Config} */
const config = {
  endOfLine: "lf",
  singleQuote: false,
  bracketSpacing: false,
  arrowParens: "always",
  trailingComma: "es5",

  // Custom rule to order imports
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "",
    "<THIRD_PARTY_MODULES>",
    "^types$",
    "",
    "^@/assets/(.*)$",
    "^@/components/ui/(.*)$",
    "^@/components/craft/(.*)$",
    "^@/components/(.*)$",
    "",
    "^@/lib/(.*)$",
    "^@/modules/(.*)$",
    "",
    "^@/pages/(.*)$",
    "^@/routes/(.*)$",
    "^@/stores/(.*)$",
    "^@/stories/(.*)$",
    "^@/utils/(.*)$",
    "",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
  ],
};

module.exports = config;
