'use strict'

import _ from 'lodash'
import Dispatcher from '../dispatcher'
import Store from './store'

// APIs
import GolfAPI from '../apis/golf'

// Actions
import GolfActions from '../actions/golf'

// Constants
import Constants from '../constants'

let _currentTournament
let _realTimeData

function clearState () {
	_currentTournament = {}
	_realTimeData = {}
}

function getCurrentTournament (fn) {
	GolfAPI.getCurrentTournament((err, res) => {
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

	GolfAPI.getRealTimeData(_currentTournament.tid, (err, res) => {
		if (err) {
			return fn(err)
		}

		_realTimeData = res
		return fn(err, res)
	})
}

const GolfStore = _.assign({
	getCurrentTournament () {
		return _currentTournament
	},

	getRealTimeData () {
		return _realTimeData
	}
}, Store)

GolfStore.dispatchToken = Dispatcher.register(({action}) => {
	const fn = _.noop

	switch (action.actionType) {
	case 'CLEAR_STATE':
		clearState()
		break

	case Constants.ACTIONS.GET_CURRENT_TOURNAMENT:
		getCurrentTournament(err => {
			if (err) {
				console.log(err)
				GolfStore.emitChange('getCurrentTournament', new Error('Failed to get current tournament.'))
				fn(err)
			} else {
				GolfActions.getRealTimeData()
				GolfStore.emitChange('getCurrentTournament')
				fn(null)
			}
		})
		break

	case Constants.ACTIONS.GET_REAL_TIME_DATA:
		getRealTimeData(err => {
			if (err) {
				console.log(err)
				GolfStore.emitChange('getRealTimeData', new Error('Failed to get current real time data.'))
				fn(err)
			} else {
				GolfStore.emitChange('getRealTimeData')
				fn(null)
			}
		})
		break

	default:
		return true
	}

	return true
})

export default GolfStore
