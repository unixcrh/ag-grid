import rootESLint from '../../eslint.config.mjs';

export default [
    ...rootESLint,
    {
        rules: {
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-var-requires': 'warn',
            'prefer-const': 'warn',
            'no-extra-boolean-cast': 'warn',
        },
    },
];
