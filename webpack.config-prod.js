'use strict'

const Base = require('./webpack.config-base')

module.exports = {
	host: '127.0.0.1',
  	port: 5000,
	
	debug: Base.debug,
	entry: Base.entry,
	output: Base.output,
	resolve: Base.resolve,
	module: Base.module,
	plugins: Base.plugins
}