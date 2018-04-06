'use strict'

import $ from 'jquery'
import sheetrock from 'sheetrock'

// import gapi from 'gapi-client'
// Client ID and API key from the Developer Console
// var CLIENT_ID = '347297161830-3qbe3nldcr8ef6e1r6fkqsn458kddobn.apps.googleusercontent.com';
// var API_KEY = 'AIzaSyCBGWPwzJQnwQnE_-YXHcwc5oVkhuz0o3M';

// // Array of API discovery doc URLs for APIs used by the quickstart
// var DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];

// // Authorization scopes required by the API; multiple scopes can be
// // included, separated by spaces.
// var SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';

// function start() {
//   // 2. Initialize the JavaScript client library.
//   gapi.client.init({
//     'apiKey': API_KEY,
//     // Your API key will be automatically added to the Discovery Document URLs.
//     'discoveryDocs': DISCOVERY_DOCS,
//     // clientId and scope are optional if auth is not required.
//     'clientId': CLIENT_ID,
//     'scope': SCOPES,
//   }).then(function() {
//     // 3. Initialize and make the API request.
//     return gapi.client.sheets.spreadsheets.values.get({
//           spreadsheetId: '1fMcWYd7g3WZxrpjE6tQ_NG37Tb6Pux6Xk5c3aY4vcbM',
//           range: 'A2:H81',
//         })
//   }).then(function(response) {
//   	console.log('Calcutta Results:')
//     console.log(response);
//   }, function(reason) {
//     console.log('Error: ' + reason.result.error.message);
//   });
// };
// // 1. Load the JavaScript client library.
// gapi.load('client', start);

const ajaxCalls = {
	getCalcuttaResults (fn) {
		sheetrock({
			url: 'https://docs.google.com/spreadsheets/d/1fMcWYd7g3WZxrpjE6tQ_NG37Tb6Pux6Xk5c3aY4vcbM/edit#gid=0',
			query: 'select A,B,C,D,E,F,G,H',
			callback: function (error, options, response) {
				if (!error) {
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
			url: 'https://docs.google.com/spreadsheets/d/1fMcWYd7g3WZxrpjE6tQ_NG37Tb6Pux6Xk5c3aY4vcbM/edit#gid=0',
			query: 'select J,K,L',
			callback: function (error, options, response) {
				if (!error) {
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
