'use strict'

const express = require('express')
const proxy = require('proxy-middleware')
const url = require('url')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const config = require('./webpack.config-dev')

const server = express()

server.use('/assets', proxy(url.parse(`http://${config.host}:${config.port}/assets`)))

server.get('/*', function(req, res) {
  res.sendFile(config.resolve.root + '/index.html')
})

new WebpackDevServer(webpack(config), {
  contentBase: config.output.path,
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: false,
  quiet: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With'
  },
  stats: {
    colors: false
  }
}).listen(config.port, config.host, function(err) {
  if (err) {
    console.log(err)
  }
})

server.listen(config.port)

console.log(`Listening at http://${config.host}:${config.port}`)
