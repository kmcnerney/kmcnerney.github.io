'use strict'

import React from 'react'

// Stores
import PgaStore from '../stores/pga-store'

// Components
import BootstrapTable from 'react-bootstrap-table-next'

let columns = [
	{
		dataField: 'current_position',
		text: 'Current Position'
	},
	{
		dataField: 'player_bio.first_name',
		text: 'First Name'
	},
	{
		dataField: 'player_bio.last_name',
		text: 'Last Name'
	}
]

function getState () {
	return {
		tournament: PgaStore.getCurrentTournament(),
		realTimeData: PgaStore.getRealTimeData()
	}
}

export default class LeaderBoard extends React.Component {
	constructor (props) {
		super(props)

		this.state = getState()

		this._onChange = this._onChange.bind(this)
	}

	componentDidMount () {
		PgaStore.addChangeListener(this._onChange)
	}

	componentWillUnmount () {
		PgaStore.removeChangeListener(this._onChange)
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
