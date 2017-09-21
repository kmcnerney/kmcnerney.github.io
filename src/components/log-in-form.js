'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'

// Actions
import { logIn } from '../actions/actions'

// Components
import { Form, Button, Row } from 'react-bootstrap'
import FieldGroup from './field-group'

// Constants
import Constants from '../constants.js'

export default class LogInForm extends React.Component {
	constructor (props) {
		super(props)

		this.onSubmit = this.onSubmit.bind(this)
	}

	render () {
		return (
			<Form horizontal className={this.props.className} onSubmit={this.onSubmit}>
				<h1 className="text-center">
					*Logo*
				</h1>
				<Row className="col-xs-offset-3 col-xs-6">
					<FieldGroup
						ref="email"
						id="email"
						type="email"
						placeholder="Email"
					/>
				</Row>
				<Row className="col-xs-offset-3 col-xs-6">
					<FieldGroup
						ref="password"
						id="password"
						type="password"
						placeholder="Password"
					/>
				</Row>
				<Row className="col-xs-offset-3 col-xs-6 text-center">
					<Button className="btn-primary" type="submit">
						Log In
					</Button>
				</Row>
			</Form>
		)
	}

	onSubmit () {
		const email = ReactDOM.findDOMNode(this.refs.email).firstChild.value
		const password = ReactDOM.findDOMNode(this.refs.password).firstChild.value

		logIn(email, password)

		Backbone.history.navigate(Constants.DASHBOARD_PAGE)
		Backbone.history.loadUrl(Constants.DASHBOARD_PAGE)
	}
}

LogInForm.propTypes = {
	className: React.PropTypes.string
}
