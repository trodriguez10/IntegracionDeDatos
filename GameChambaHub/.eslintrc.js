module.exports = {
	parser: '@typescript-eslint/parser',
	env: {
		es2021: true,
	},
	extends: [
		'@react-native-community',
		'plugin:react/recommended',
		'plugin:react-native/all',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', 'react-native', '@typescript-eslint', 'jest', 'prettier'],
	rules: { 'prettier/prettier': 'error' },
	settings: {
		react: {
			version: 'detect',
		},
	},
};
