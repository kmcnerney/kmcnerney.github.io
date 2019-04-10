'use strict'

import $ from 'jquery'
import sheetrock from 'sheetrock'

const gDoc = 'https://docs.google.com/spreadsheets/d/1fMcWYd7g3WZxrpjE6tQ_NG37Tb6Pux6Xk5c3aY4vcbM/edit#gid=1000055250'

const ajaxCalls = {
	getCalcuttaResults (fn) {
		sheetrock({
			url: gDoc,
			query: 'select A,B,C,D,E,F,G,H',
			callback: function (error, options, response) {
				if (!error) {
					console.log('Calcutta Results:')
					console.log(response)
					return fn(null, response.rows)
				} else {
					return fn(error)
				}
			}
		})
	},

	getPayoutInfo (fn) {
		sheetrock({
			url: gDoc,
			query: 'select J,K,L',
			callback: function (error, options, response) {
				if (!error) {
					console.log('Payout Info:')
					console.log(response)
					return fn(null, response.rows)
				} else {
					return fn(error)
				}
			}
		})
	},

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
