'use strict'

import _ from 'lodash'

import React from 'react'
import Backbone from 'backbone'

import { Navbar, Nav, NavItem } from 'react-bootstrap'

// Constants
import Constants from '../constants.js'

export default class NavBar extends React.Component {
	constructor (props) {
		super(props)
		console.log(props)
		this.togglePage = this.togglePage.bind(this)
	}

	render () {
		return (
			<Navbar inverse className="landing-nav">
				<Navbar.Header>
					<Navbar.Brand>
						<a href="#">{Constants.COMPANY_NAME}</a>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav pullRight>
						<NavItem eventKey={Constants.LOG_IN_PAGE} onClick={() => this.togglePage(Constants.LOG_IN_PAGE)}>Log In</NavItem>
						<NavItem eventKey={Constants.SIGN_UP_PAGE} onClick={() => this.togglePage(Constants.SIGN_UP_PAGE)}>Sign Up</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}

	togglePage (page) {
		if (!_.isEqual(page, this.props.page)) {
			Backbone.history.navigate(page)
			Backbone.history.loadUrl(page)
		}
	}
}

NavBar.propTypes = {
	page: React.PropTypes.string
}
