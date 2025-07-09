import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import unusedImports from "eslint-plugin-unused-imports";
import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const linter = [
  {
    ignores: [
      // Build outputs
      ".next/**",
      "out/**",
      "dist/**",
      "build/**",

      // Dependencies
      "node_modules/**",

      // Environment files
      ".env*",

      // Logs
      "npm-debug.log*",
      "yarn-debug.log*",
      "yarn-error.log*",

      // Runtime data
      "pids",
      "*.pid",
      "*.seed",
      "*.pid.lock",

      // Coverage directory
      "coverage/**",
      ".nyc_output/**",

      // Cache directories
      ".eslintcache",
      ".cache/**",
      ".parcel-cache/**",

      // Next.js specific
      ".next/**",

      // Package files
      "*.tgz",
      ".yarn-integrity",
      ".pnp.*",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // TypeScript-specific config only for TS/TSX files
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": tseslint,
      "unused-imports": unusedImports,
    },
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  // General JS/JSX config (no TS parser)
  {
    files: ["**/*.js", "**/*.jsx", "**/*.mjs", "**/*.cjs"],
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
];

export default linter;
