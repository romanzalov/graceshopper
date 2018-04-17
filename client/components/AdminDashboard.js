import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AdminDashboard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div></div>

			)
	}
}

const mapStateToProps = function(state) {
	
}

const mapDispatchToProps = function(dispatch) {

}

export default connect(mapStateToProps,mapDispatchToProps)(AdminDashboard)
