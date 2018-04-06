'use strict'

import Backbone from 'backbone'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers/root-reducer'

// Actions
import GolfActions from './actions/golf'

// Styles
import './less/main.less'

// Components
import LeaderBoard from './components/leader-board'

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
		GolfActions.getCurrentTournament()
		GolfActions.getRealTimeData()
		renderContent(Constants.LEADER_BOARD_PAGE, <LeaderBoard />)
	}
})

new Router()
Backbone.history.start()
