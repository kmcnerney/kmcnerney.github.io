'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'

// Actions
import { sendEmail } from '../actions/actions'

// Components
import { Form, Button, Row } from 'react-bootstrap'
import FieldGroup from './field-group'

// Constants
import Constants from '../constants.js'

export default class SignUpForm extends React.Component {
	constructor (props) {
		super(props)

		this.onSubmit = this.onSubmit.bind(this)
	}

	render () {
		return (
			<Form horizontal className={this.props.className} onSubmit={this.onSubmit}>
				<h1 className="text-center">
					Join {Constants.PROJECT_NAME}!
				</h1>
				<Row className="col-xs-offset-3 col-xs-6">
					<FieldGroup
						ref="firstName"
						id="firstName"
						type="text"
						placeholder="First Name"
					/>
				</Row>
				<Row className="col-xs-offset-3 col-xs-6">
					<FieldGroup
						ref="lastName"
						id="lastName"
						type="text"
						placeholder="Last Name"
					/>
				</Row>
				<Row className="col-xs-offset-3 col-xs-6">
					<FieldGroup
						ref="organization"
						id="organization"
						type="text"
						placeholder="Organization"
					/>
				</Row>
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
						ref="comments"
						id="comments"
						componentClass="textarea"
						placeholder="Comments"
					/>
				</Row>
				<Row className="col-xs-offset-3 col-xs-6 text-center">
					<Button className="btn-primary" type="submit">
						Email Us
					</Button>
				</Row>
			</Form>
		)
	}

	onSubmit () {
		const info = {
			firstName: ReactDOM.findDOMNode(this.refs.firstName).firstChild.value,
			lastName: ReactDOM.findDOMNode(this.refs.lastName).firstChild.value,
			organization: ReactDOM.findDOMNode(this.refs.organization).firstChild.value,
			email: ReactDOM.findDOMNode(this.refs.email).firstChild.value,
			comments: ReactDOM.findDOMNode(this.refs.comments).firstChild.value
		}

		sendEmail(info)

		Backbone.history.navigate(Constants.LOG_IN_PAGE)
		Backbone.history.loadUrl(Constants.LOG_IN_PAGE)
	}
}

SignUpForm.propTypes = {
	className: React.PropTypes.string
}
