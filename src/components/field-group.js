'use strict'

import React from 'react'
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'

export default class FieldGroup extends React.Component {
	render () {
		return (
			<FormGroup controlId={this.props.id}>
				{this.props.label && <ControlLabel>{this.props.label}</ControlLabel>}
				<FormControl {...this.props} />
				{this.props.help && <HelpBlock>{this.props.help}</HelpBlock>}
			</FormGroup>
		)
	}
}

FieldGroup.propTypes = {
	id: React.PropTypes.string.isRequired,
	type: React.PropTypes.string,
	componentClass: React.PropTypes.string,
	label: React.PropTypes.string,
	help: React.PropTypes.string
}
