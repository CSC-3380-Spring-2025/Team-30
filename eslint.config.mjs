import eslint from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
	recommendedConfig: eslint.configs.recommended,
});

const eslintConfig = [
	...compat.config({
		extends: [
			'eslint:recommended',
			'plugin:@typescript-eslint/strict',
			'plugin:@typescript-eslint/stylistic',
			'next'
		],
	}),
];

export default eslintConfig;
