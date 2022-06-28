module.exports = ctx => ({
	parser: ctx.parser ? 'sugarss' : false,
	map: ctx.env === 'development' ? ctx.map : false,
	plugins: {
		'postcss-import': {},
		'postcss-nested': {},
		'postcss-nesting': {},
		'postcss-preset-env': {
			stage: 3
		},
		cssnano: ctx.env === 'production' ? {} : false
	}
})
