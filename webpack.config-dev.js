'use strict'

const Base = require('./webpack.config-base')

module.exports = {
	entry: Base.entry,
	output: Base.output,
	node: Base.node,
	resolve: Base.resolve,
	module: Base.module,
	plugins: Base.plugins
}