'use strict'

import _ from 'lodash'
import Dispatcher from '../dispatcher'
import Store from './store'

// APIs
import PgaAPI from '../apis/pga'

// Constants
import Constants from '../constants'

let _currentTournament
let _realTimeData

function clearState () {
	_currentTournament = {}
	_realTimeData = {}
}

function getCurrentTournament (fn) {
	PgaAPI.getCurrentTournament((err, res) => {
		if (err) {
			return fn(err)
		}

		_currentTournament = res
		return fn(err, res)
	})
}

function getRealTimeData (fn) {
	if (!_currentTournament) {
		return fn('Waiting for tournament ID...')
	}

	PgaAPI.getRealTimeData(13, (err, res) => {
		if (err) {
			return fn(err)
		}

		_realTimeData = res
		return fn(err, res)
	})
}

const PgaStore = _.assign({
	getCurrentTournament () {
		return _currentTournament
	},

	getRealTimeData () {
		return _realTimeData
	}
}, Store)

PgaStore.dispatchToken = Dispatcher.register(({ action }) => {
	const fn = _.noop

	switch (action.actionType) {
	case 'CLEAR_STATE':
		clearState()
		break

	case Constants.ACTIONS.GET_CURRENT_TOURNAMENT:
		getCurrentTournament(err => {
			if (err) {
				console.log(err)
				PgaStore.emitChange('getCurrentTournament', new Error('Failed to get current tournament.'))
				fn(err)
			} else {
				PgaStore.getRealTimeData()
				PgaStore.emitChange('getCurrentTournament')
				fn(null)
			}
		})
		break

	case Constants.ACTIONS.GET_REAL_TIME_DATA:
		getRealTimeData(err => {
			if (err) {
				console.log(err)
				PgaStore.emitChange('getRealTimeData', new Error('Failed to get current real time data.'))
				fn(err)
			} else {
				PgaStore.emitChange('getRealTimeData')
				fn(null)
			}
		})
		break

	default:
		return true
	}

	return true
})

export default PgaStore
