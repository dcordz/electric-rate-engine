import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintImport from "eslint-plugin-import";
import typescriptParser from "@typescript-eslint/parser";
import typescriptEslint from "@typescript-eslint/eslint-plugin";

export default [
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic,
    {
        languageOptions: {
            globals: {
                ...globals.serviceworker,
                ...globals.browser,
            },
            parserOptions: {
                parser: typescriptParser,
                project: "tsconfig.json",
                ecmaVersion: "latest",
                sourceType: "module",
                ecmaFeatures: {
                    jsx: false,
                },
            },
        },

        plugins: {
            "@typescript-eslint": typescriptEslint,
            import: eslintImport,
        },
    },
    {
        settings: {
            
        },
    },
    {
        rules: {

            "constructor-super": "error",
            "no-restricted-globals": "error",
            eqeqeq: ["warn", "always"],
            "import/no-deprecated": "off",
            "import/no-extraneous-dependencies": "error",
            "import/no-unassigned-import": "off",
            "no-cond-assign": "error",
            "no-duplicate-case": "error",
            "no-duplicate-imports": "error",
            "no-empty": [
                "error",
                {
                    allowEmptyCatch: true,
                },
            ],
            "no-unused-vars": "off",
            "no-invalid-this": "error",
            "no-new-wrappers": "error",
            "no-param-reassign": "error",
            "no-redeclare": "error",
            "no-sequences": "error",
            "no-shadow": [
                "error",
                {
                    hoist: "all",
                },
            ],
            "no-throw-literal": "error",
            "no-unsafe-finally": "error",
            "no-unused-labels": "error",
            "no-var": "warn",
            "no-void": "error",
            "prefer-const": "warn",

            "@typescript-eslint/ban-ts-comment": "warn",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": [
                "warn", // or "error"
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],

            "@typescript-eslint/array-type": [
                "error",
                {
                    default: "generic",
                    readonly: "generic",
                }
            ]
        },
    },
    {
        ignores: [
            "lib/",
            "node_modules/",
            "eslint.config.js",
            "**/__mocks__",
            "**/__tests__",
        ],
    },
];
