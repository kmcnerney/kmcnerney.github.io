'use strict'

import Dispatcher from '../dispatcher'

// Constants
import Constants from '../constants.js'

const GolfActions = {
	getCalcuttaResults (fn) {
		Dispatcher.handleViewAction({
			actionType: Constants.ACTIONS.GET_CALCUTTA_RESULTS,
			fn
		})
	},

	getPayoutInfo (fn) {
		Dispatcher.handleViewAction({
			actionType: Constants.ACTIONS.GET_PAYOUT_INFO,
			fn
		})
	}
}

export default GolfActions
