'use strict'

import React from 'react'

import Navbar from 'react-bootstrap/Navbar'

// Stores
import GolfStore from '../stores/golf'

function getState () {
	return {
		tournamentName: GolfStore.getRealTimeData() ? GolfStore.getRealTimeData().leaderboard.tournament_name : []
	}
}

export default class NavBar extends React.Component {
	constructor (props) {
		super(props)

		this.state = getState()
	}

	componentDidMount () {
		GolfStore.addChangeListener(() => this._onChange())
	}

	componentWillUnmount () {
		GolfStore.removeChangeListener(() => this._onChange())
	}

	render () {
		return (
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand href="#">{this.state.tournamentName}</Navbar.Brand>
			</Navbar>
		)
	}

	_onChange () {
		this.setState(getState())
	}
}
