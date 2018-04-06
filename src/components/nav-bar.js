'use strict'

import React from 'react'

import { Navbar, Nav, NavItem } from 'react-bootstrap'

// Constants
import Constants from '../constants.js'

export default class NavBar extends React.Component {
	constructor (props) {
		super(props)
		this.signIn = this.signIn.bind(this)
	}

	render () {
		return (
			<Navbar inverse className="landing-nav">
				<Navbar.Header>
					<Navbar.Brand>
						<a href="#">{Constants.PROJECT_NAME}</a>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav pullRight>
						<NavItem eventKey={'signIn'} onClick={() => this.signIn()}>Sign In</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}

	signIn (page) {
		// gapi.auth2.getAuthInstance().signIn()
		return null
	}
}

NavBar.propTypes = {
	page: React.PropTypes.string
}
