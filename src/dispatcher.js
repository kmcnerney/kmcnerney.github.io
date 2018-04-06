// https://github.com/facebook/react/blob/master/examples/todomvc-flux/js/dispatcher/AppDispatcher.js
'use strict'

import _ from 'lodash'
import { Promise } from 'es6-promise'

let _callbacks = []
let _promises = []

let Dispatcher = function () {}
Dispatcher.prototype = _.extend(Dispatcher.prototype, {

	register: function (callback) {
		_callbacks.push(callback)
		return _callbacks.length - 1
	},

	dispatch: function (payload) {
		let resolves = []
		let rejects = []
		_promises = _callbacks.map(function (_, i) {
			return new Promise(function (resolve, reject) {
				resolves[i] = resolve
				rejects[i] = reject
			})
		})
		_callbacks.forEach(function (callback, i) {
			Promise.resolve(callback(payload)).then(function () {
				resolves[i](payload)
			}, function () {
				rejects[i](new Error('Dispatcher callback unsuccessful'))
			})
		})
		_promises = []
	},

	waitFor: function (promiseIndexes, callback) {
		let selectedPromises = promiseIndexes.map(function (index) {
			return _promises[index]
		})
		return Promise.all(selectedPromises).then(callback)
	}
})

export default _.extend(new Dispatcher(), {

	handleViewAction: function (action) {
		this.dispatch({
			source: 'VIEW_ACTION',
			action: action
		})
	},

	handleServerAction: function (action) {
		this.dispatch({
			source: 'SERVER_ACTION',
			action: action
		})
	}

})
