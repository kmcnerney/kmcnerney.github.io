'use strict'

import Backbone from 'backbone'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers/root-reducer'

// Styles
import './sass/main.scss'

// Actions
import GoogleSheetsActions from './actions/google-sheets'
import PgaActions from './actions/pga'

// Components
import LeaderBoard from './components/leader-board'
import NavBar from './components/nav-bar'

// Constants
import Constants from './constants.js'

require('file-loader!../index.html')

const store = createStore(rootReducer, {},
	window.devToolsExtension ? window.devToolsExtension() : f => f
)

function renderContent (page, content) {
	return ReactDOM.render(
		<Provider store={store}>
			<div>
				<NavBar page={page} />
				{content}
			</div>
		</Provider>, document.getElementById('root-div')
	)
}

const Router = Backbone.Router.extend({
	routes: {
		'': Constants.LEADER_BOARD_PAGE
	},

	leaderBoard () {
		GoogleSheetsActions.getCalcuttaResults()
		GoogleSheetsActions.getPayoutInfo()
		PgaActions.getCurrentTournament()
		PgaActions.getRealTimeData()
		setInterval(() => PgaActions.getRealTimeData(), 30000) // refresh data every 5 seconds
		renderContent(Constants.LEADER_BOARD_PAGE, <LeaderBoard />)
	}
})

new Router()
Backbone.history.start()
