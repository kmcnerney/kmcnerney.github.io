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

let _calcuttaResults
let _payoutInfo
let _currentTournament
let _realTimeData

function clearState () {
	_calcuttaResults = {}
	_payoutInfo = {}
	_currentTournament = {}
	_realTimeData = {}
}

function getCalcuttaResults (fn) {
	GolfAPI.getCalcuttaResults((err, res) => {
		if (err) {
			return fn(err)
		}

		_calcuttaResults = res
		return fn(err, res)
	})
}

function getPayoutInfo (fn) {
	GolfAPI.getPayoutInfo((err, res) => {
		if (err) {
			return fn(err)
		}

		_payoutInfo = res
		return fn(err, res)
	})
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
	getCalcuttaResults () {
		return _calcuttaResults
	},

	getPayoutInfo () {
		return _payoutInfo
	},

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

	case Constants.ACTIONS.GET_CALCUTTA_RESULTS:
		getCalcuttaResults(err => {
			if (err) {
				console.log(err)
				GolfStore.emitChange('getCalcuttaResults', new Error('Failed to get calcutta results.'))
				fn(err)
			} else {
				GolfStore.emitChange('getCalcuttaResults')
				fn(null)
			}
		})
		break

	case Constants.ACTIONS.GET_PAYOUT_INFO:
		getPayoutInfo(err => {
			if (err) {
				console.log(err)
				GolfStore.emitChange('getPayoutInfo', new Error('Failed to get payout info.'))
				fn(err)
			} else {
				GolfStore.emitChange('getPayoutInfo')
				fn(null)
			}
		})
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
