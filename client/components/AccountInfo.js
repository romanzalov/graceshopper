import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AccountInfo extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="container">
				<div className="row">
				<h1 className="my-4">All Users</h1>
				<table style={{width:"100%"}} className="table">
				<tbody>
				  <tr>
					<th>Email</th>
					<th>Name</th>
					<th>Orders</th>
					<th>Items</th> 
				  </tr>
				  <tr>				  
				  <td>April 15th, 2018</td> 
				  <td>$59.99</td> 
				  <td>Address here</td>
					<td></td>
				</tr>
				</tbody>
			</table>
				</div>	
			</div>
			)
	}
}

const mapStateToProps = function(state) {
	
}

const mapDispatchToProps = function(dispatch) {

}

export default connect(mapStateToProps,mapDispatchToProps)(AccountInfo)
