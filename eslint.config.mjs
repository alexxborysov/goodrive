import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import cspellConfigs from "@cspell/eslint-plugin/configs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  cspellConfigs.recommended,
  {
    rules: {
      "@cspell/spellchecker": ["warn", { checkComments: true, autoFix: true }],
      "react-hooks/exhaustive-deps": "off",
    },
  },
];

export default eslintConfig;
