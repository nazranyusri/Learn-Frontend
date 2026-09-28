const expoConfig = require('eslint-config-expo/flat');

module.exports = [
	...expoConfig,
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		rules: {
			eqeqeq: ['error', 'always'],
			'no-console': 'error',
			'no-debugger': 'error',
			'no-unreachable': 'error',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': 'error',
		},
	},
];