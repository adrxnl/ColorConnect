export default [
    {
        files: ["**/*.js"],
        languageOptions: {
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: "module"
            }
        },
        rules: {
            "no-console": "warn",
            "no-unused-vars": "warn"
        }
    }
];
