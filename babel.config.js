/**
 * By default @babel/preset-env will use browserslist config sources unless either the targets or ignoreBrowserslistConfig options are set.
 * https://babeljs.io/docs/en/babel-preset-env
 */
module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				useBuiltIns: 'usage',
				corejs: 3
			}
		]
	],
	env: {
		test: {
			presets: [['@babel/preset-env', { targets: { node: 'current' } }]]
		}
	}
};
