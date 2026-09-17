import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    rules: {
      // Stylistic only: apostrophes in JSX copy.
      "react/no-unescaped-entities": "warn",
      // Typed MDX component maps legitimately use `any`.
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
]);
