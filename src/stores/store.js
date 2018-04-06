'use strict'

import _ from 'lodash'
import { EventEmitter } from 'events'

export default _.assign({
	emitChange: function (event, msg, id, res) {
		this.emit('change')
		if (typeof event !== 'function') {
			this.emit(event, msg, id, res)
		}
	},

	addChangeListener: function (event, callback) {
		if (typeof event === 'function') {
			this.on('change', event)
		} else {
			this.on(event, callback)
		}
	},

	removeChangeListener: function (event, callback) {
		if (typeof event === 'function') {
			this.removeListener('change', event)
		} else {
			this.removeListener(event, callback)
		}
	}
}, EventEmitter.prototype)
