'use strict'

import React from 'react'

// Stores
import GolfStore from '../stores/golf'

// Components
import BootstrapTable from 'react-bootstrap-table-next'

let columns = [
	{
		dataField: 'current_position',
		text: 'Current Position'
	},
	{
		dataField: 'player_bio.first_name',
		text: 'Golfer'
	},
	{
		dataField: 'player_bio.last_name',
		text: ''
	}
]

function getState () {
	return {
		tournament: GolfStore.getCurrentTournament(),
		realTimeData: GolfStore.getRealTimeData()
	}
}

export default class LeaderBoard extends React.Component {
	constructor (props) {
		super(props)

		this.state = getState()

		this._onChange = this._onChange.bind(this)
	}

	componentDidMount () {
		GolfStore.addChangeListener(this._onChange)
	}

	componentWillUnmount () {
		GolfStore.removeChangeListener(this._onChange)
	}

	render () {
		let data = this.state.realTimeData ? this.state.realTimeData.leaderboard.players : []

		return (
			<BootstrapTable
				keyField="leaderBoard"
				data={data}
				columns={columns}
			/>
		)
	}

	_onChange () {
		this.setState(getState())
	};

}
