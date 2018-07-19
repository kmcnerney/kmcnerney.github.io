'use strict'

import React from 'react'
import _ from 'lodash'

// Stores
import GolfStore from '../stores/golf'

// Components
import BootstrapTable from 'react-bootstrap-table-next'

const NUM_TO_PAYOUT = 10
const CALCUTTA_DOC_INDICES = {
	ODDS: 2,
	BUYER: 5,
	COST: 6,
	EXPECTED_VAL: 7
}
const COLUMNS = [
	{
		dataField: 'current_position',
		text: 'Current Position'
	},
	{
		dataField: 'today',
		text: 'Today'
	},
	{
		dataField: 'total',
		text: 'Total'
	},
	{
		dataField: 'player_bio.first_name',
		text: 'Golfer'
	},
	{
		dataField: 'player_bio.last_name',
		text: ''
	},
	{
		dataField: 'buyer',
		text: 'Buyer'
	},
	{
		dataField: 'odds',
		text: 'Odds'
	},
	{
		dataField: 'cost',
		text: 'Cost'
	},
	{
		dataField: 'expected_value',
		text: 'Expected Value'
	},
	{
		dataField: 'actual_value',
		text: 'Actual Value'
	}
]

function getPayoutForPositionCurrency (payoutInfo, pos) {
	return payoutInfo[pos].cellsArray[2]
}

function getPayoutForPositionNumber (payoutInfo, pos) {
	return Number(getPayoutForPositionCurrency(payoutInfo, pos).replace(/[^0-9.-]+/g, ''))
}

function getState () {
	let calcuttaResults = GolfStore.getCalcuttaResults()
	let payoutInfo = GolfStore.getPayoutInfo()
	let realTimeData = GolfStore.getRealTimeData() ? GolfStore.getRealTimeData().leaderboard.players : []

	if (calcuttaResults && payoutInfo) {
		let currPosition = 1
		let golfersPaid = 0
		for (let golferRow = 0; golferRow < realTimeData.length; golferRow++) {
			let golfer = realTimeData[golferRow]
			let actualVal = '$0'
			let currPosMatch = _.isEqual('T' + currPosition, golfer.current_position)

			if (golfersPaid <= NUM_TO_PAYOUT || currPosMatch) {
				if (!currPosMatch) {
					currPosition = golfer.current_position.match(/\d+/)[0]
				}

				if (_.isEqual('' + currPosition, golfer.current_position)) {
					// actualVal = the payout for this position
					actualVal = getPayoutForPositionCurrency(payoutInfo, currPosition)
					currPosition++
				} else if (_.isEqual('T' + currPosition, golfer.current_position)) {
					// actualVal = the payout for this position + the payout for how many tied / how many tied
					actualVal = getPayoutForPositionCurrency(payoutInfo, currPosition)
				}

				golfersPaid++
			}

			realTimeData[golferRow].actual_value = actualVal.replace(/\s/g, '')

			for (let buyerRow = 0; buyerRow < calcuttaResults.length; buyerRow++) {
				let buyer = calcuttaResults[buyerRow].cellsArray

				if (_.isEqual(golfer.player_bio.first_name + ' ' + golfer.player_bio.last_name, buyer[1])) {
					realTimeData[golferRow].buyer = buyer[CALCUTTA_DOC_INDICES.BUYER]
					realTimeData[golferRow].odds = buyer[CALCUTTA_DOC_INDICES.ODDS] + '/1'
					realTimeData[golferRow].cost = buyer[CALCUTTA_DOC_INDICES.COST].replace(/\s/g, '')
					realTimeData[golferRow].expected_value = buyer[CALCUTTA_DOC_INDICES.EXPECTED_VAL].replace(/\s/g, '')
					break
				}

				if (_.isEqual(buyerRow, 40)) {
					// this golfer is in the field
					realTimeData[golferRow].buyer = buyer[CALCUTTA_DOC_INDICES.BUYER]
					realTimeData[golferRow].odds = 'FIELD'
					realTimeData[golferRow].cost = '$' + (_.parseInt(buyer[CALCUTTA_DOC_INDICES.COST].replace(/[^0-9.-]+/g, '')) / 40)
					realTimeData[golferRow].expected_value = '$' + (parseFloat(buyer[CALCUTTA_DOC_INDICES.EXPECTED_VAL].replace(/[^0-9.-]+/g, '')) / 40)
					break
				}
			}
		}

		// go back through the data to split tied payouts
		if (realTimeData.length > 0) {
			let currVal = realTimeData[0].actual_value
			let tieCount = 1
			let timeToSplitPayout = false

			for (let i = 1; i <= golfersPaid; i++) {
				if (_.isEqual(realTimeData[i].actual_value, currVal)) {
					timeToSplitPayout = true
					tieCount++
				} else if (timeToSplitPayout) {
					if (i > 0) {
						let totalPayout = 0
						for (let j = tieCount - 1; j >= 0; j--) {
							let position = i - j
							let thisPayout = getPayoutForPositionNumber(payoutInfo, position)
							if (position <= NUM_TO_PAYOUT) {
								totalPayout += thisPayout
							}
						}

						let finalPayout = totalPayout / tieCount
						for (let j = tieCount - 1; j >= 0; j--) {
							let position = i - 1 - j
							realTimeData[position].actual_value = '$' + finalPayout
						}
						tieCount = 1
						timeToSplitPayout = false
					}
				}
				currVal = realTimeData[i].actual_value
			}
		}
	}

	return {
		calcuttaResults,
		payoutInfo,
		tournament: '100', // GolfStore.getCurrentTournament(),
		realTimeData
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
		return (
			<BootstrapTable
				keyField="leaderBoard"
				data={this.state.realTimeData}
				columns={COLUMNS}
			/>
		)
	}

	_onChange () {
		this.setState(getState())
	};

}
