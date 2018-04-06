'use strict'

import $ from 'jquery'

const ajaxCalls = {
	getCurrentTournament (fn) {
		$.ajax({
			url: `https://statdata.pgatour.com/r/current/message.json`,
			success: function (response) {
				console.log('Tournament:')
				console.log(response)
				return fn(null, response)
			}
		})
	},

	getRealTimeData (tournamentId, fn) {
		$.ajax({
			url: `https://statdata.pgatour.com/r/${tournamentId}/leaderboard-v2mini.json`,
			success: function (response) {
				console.log('Real Time Data:')
				console.log(response)
				return fn(null, response)
			}
		})
	}
}

export default ajaxCalls
