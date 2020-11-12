'use strict'

import Dispatcher from '../dispatcher'

// Constants
import Constants from '../constants.js'

const PgaActions = {
	getCurrentTournament (fn) {
		Dispatcher.handleViewAction({
			actionType: Constants.ACTIONS.GET_CURRENT_TOURNAMENT,
			fn
		})
	},

	getRealTimeData (fn) {
		Dispatcher.handleViewAction({
			actionType: Constants.ACTIONS.GET_REAL_TIME_DATA,
			fn
		})
	}
}

export default PgaActions
