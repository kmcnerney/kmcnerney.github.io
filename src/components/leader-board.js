'use strict'

import React from 'react'
import _ from 'lodash'

// Stores
import GolfStore from '../stores/golf'

// Components
import BootstrapTable from 'react-bootstrap-table-next'

const NUM_GOLFERS_TO_PAY = 10
const NUM_GOLFERS_AUCTIONED = 47
const CALCUTTA_DOC_INDICES = {
	ODDS: 2,
	BUYER: 5,
	COST: 6,
	EXPECTED_VAL: 7
}
const COLUMNS = [
	{
		dataField: 'current_position',
		text: 'Position'
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
		dataField: 'today',
		text: 'Today'
	},
	{
		dataField: 'total',
		text: 'Total'
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
	if (pos > NUM_GOLFERS_TO_PAY) {
		return 0
	}
	return Number(getPayoutForPositionCurrency(payoutInfo, pos).replace(/[^0-9.-]+/g, ''))
}

function convertToNumber (numString) {
	return numString.replace(/[^0-9.,]/g, '')
}

function convertToDollars (num) {
	return '$' + _.round(num, 2).toFixed(2)
}

function getState () {
	const calcuttaResults = GolfStore.getCalcuttaResults()
	const payoutInfo = GolfStore.getPayoutInfo()
	const realTimeData = GolfStore.getRealTimeData()

	const tableData = []

	if (calcuttaResults && payoutInfo && realTimeData) {
		tableData.push()
		let currPosition = 1
		let golfersPaid = 0
		const golferData = realTimeData.leaderboard.players
		const numFieldGolfers = golferData.length - NUM_GOLFERS_AUCTIONED

		for (let golferRow = 0; golferRow < golferData.length; golferRow++) {
			tableData.push(Object.assign({}, golferData[golferRow]))

			let golfer = tableData[golferRow]
			let actualVal = convertToDollars(0)

			// setting a complete tie for first place before the tournament has started
			if (_.isEmpty(golfer.current_position)) {
				golfer.current_position = 'T1'
			}
			if (!golfer.today) {
				golfer.today = 0
			}

			if (golfersPaid <= NUM_GOLFERS_TO_PAY || _.isEqual('T' + currPosition, golfer.current_position)) {
				currPosition = golfer.current_position.match(/\d+/)[0]
				actualVal = getPayoutForPositionCurrency(payoutInfo, currPosition)
				golfersPaid++
			}

			tableData[golferRow].actual_value = convertToDollars(convertToNumber(actualVal.replace(/\s/g, '')))

			console.log('calcuttaResults')
			console.log(calcuttaResults)
			for (let buyerRow = 0; buyerRow <= NUM_GOLFERS_AUCTIONED; buyerRow++) {
				let buyer = calcuttaResults[buyerRow].cellsArray

				if (_.isEqual(golfer.player_bio.first_name + ' ' + golfer.player_bio.last_name, buyer[1])) {
					tableData[golferRow].buyer = buyer[CALCUTTA_DOC_INDICES.BUYER]
					tableData[golferRow].odds = buyer[CALCUTTA_DOC_INDICES.ODDS] + '/1'
					tableData[golferRow].cost = buyer[CALCUTTA_DOC_INDICES.COST].replace(/\s/g, '')
					tableData[golferRow].expected_value = buyer[CALCUTTA_DOC_INDICES.EXPECTED_VAL].replace(/\s/g, '')
					break
				}

				if (_.isEqual(buyerRow, NUM_GOLFERS_AUCTIONED)) {
					// this golfer is in the field
					tableData[golferRow].buyer = buyer[CALCUTTA_DOC_INDICES.BUYER]
					tableData[golferRow].odds = 'FIELD'
					tableData[golferRow].cost = convertToDollars(convertToNumber(buyer[CALCUTTA_DOC_INDICES.COST]) / numFieldGolfers)
					tableData[golferRow].expected_value = convertToDollars(convertToNumber(buyer[CALCUTTA_DOC_INDICES.EXPECTED_VAL]) / numFieldGolfers)
					break
				}
			}
		}

		// go back through the data to split tied payouts
		let i = 0
		while (i < golfersPaid - 1) {
			let j = 1
			let groupedPayout = getPayoutForPositionNumber(payoutInfo, i + 1)
			while (_.isEqual(tableData[i].actual_value, tableData[i + j].actual_value)) {
				if (_.isEqual(golfersPaid - 1, i + j)) {
					j++
					break
				}
				groupedPayout += getPayoutForPositionNumber(payoutInfo, i + j + 1)
				j++
			}

			let tieCount = j
			while (j > 0) {
				tableData[i + j - 1].actual_value = convertToDollars(groupedPayout / tieCount)
				j--
			}
			i += tieCount
		}
	}

	return {
		tableData
	}
}

export default class LeaderBoard extends React.Component {
	constructor (props) {
		super(props)

		this.state = getState()
	}

	componentDidMount () {
		GolfStore.addChangeListener(() => this._onChange())
	}

	componentWillUnmount () {
		GolfStore.removeChangeListener()
	}

	render () {
		return (
			<BootstrapTable
				keyField="player_id"
				data={this.state.tableData}
				columns={COLUMNS}
			/>
		)
	}

	_onChange () {
		this.setState(getState())
	}
}
