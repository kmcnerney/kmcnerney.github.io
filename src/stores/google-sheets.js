'use strict'

import _ from 'lodash'
import Dispatcher from '../dispatcher'
import Store from './store'

// APIs
import GoogleSheetsAPI from '../apis/google-sheets'

// Constants
import Constants from '../constants'

let _calcuttaResults
let _payoutInfo

function clearState () {
	_calcuttaResults = {}
	_payoutInfo = {}
}

function getCalcuttaResults (fn) {
	GoogleSheetsAPI.getCalcuttaResults((err, res) => {
		if (err) {
			return fn(err)
		}

		_calcuttaResults = res
		return fn(err, res)
	})
}

function getPayoutInfo (fn) {
	GoogleSheetsAPI.getPayoutInfo((err, res) => {
		if (err) {
			return fn(err)
		}

		_payoutInfo = res
		return fn(err, res)
	})
}

const GoogleSheetsStore = _.assign({
	getCalcuttaResults () {
		return _calcuttaResults
	},

	getPayoutInfo () {
		return _payoutInfo
	}
}, Store)

GoogleSheetsStore.dispatchToken = Dispatcher.register(({ action }) => {
	const fn = _.noop

	switch (action.actionType) {
	case 'CLEAR_STATE':
		clearState()
		break

	case Constants.ACTIONS.GET_CALCUTTA_RESULTS:
		getCalcuttaResults(err => {
			if (err) {
				console.log(err)
				GoogleSheetsStore.emitChange('getCalcuttaResults', new Error('Failed to get calcutta results.'))
				fn(err)
			} else {
				GoogleSheetsStore.emitChange('getCalcuttaResults')
				fn(null)
			}
		})
		break

	case Constants.ACTIONS.GET_PAYOUT_INFO:
		getPayoutInfo(err => {
			if (err) {
				console.log(err)
				GoogleSheetsStore.emitChange('getPayoutInfo', new Error('Failed to get payout info.'))
				fn(err)
			} else {
				GoogleSheetsStore.emitChange('getPayoutInfo')
				fn(null)
			}
		})
		break

	default:
		return true
	}

	return true
})

export default GoogleSheetsStore
