'use strict'

import React from 'react'

import Navbar from 'react-bootstrap/Navbar'

// Stores
import PgaStore from '../stores/pgaStore'

function getState () {
	return {
		tournamentName: PgaStore.getRealTimeData() ? PgaStore.getRealTimeData().leaderboard.tournament_name : []
	}
}

export default class NavBar extends React.Component {
	constructor (props) {
		super(props)

		this.state = getState()
	}

	componentDidMount () {
		PgaStore.addChangeListener(() => this._onChange())
	}

	componentWillUnmount () {
		PgaStore.removeChangeListener(() => this._onChange())
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
