/* eslint-disable */
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class OrderHistory extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="container">
				<div className="row">
				<h1 className="my-4">Order History</h1>
				<table style={{width:"100%"}} className="table">
				<tbody>
				  <tr>
					<th>Order Placed</th>
					<th>Total</th>
					<th>Shipped To</th>
					<th>Items</th> 
				  </tr>
				  <tr>				  
				  <td>April 15th, 2018</td> 
				  <td>$59.99</td> 
				  <td>Address here</td>
					<td>
						<div style={{border: "1px solid black", marginBottom:"5px"}}>
							<a href="#"><img className="card-img-top" src="http://placehold.it/700x400" alt="" 
							style={{width:"200px", marginRight:"5px"}}/></a>
							Item description here
						</div>
						<div style={{border: "1px solid black", marginBottom:"5px"}}>
							<a href="#"><img className="card-img-top" src="http://placehold.it/700x400" alt="" 
							style={{width:"200px", marginRight:"5px"}}/></a>
							Item description here
						</div>
					</td>
				  </tr>
				  <tr>				  
				  <td>August 18th, 2017</td> 
				  <td>$59.99</td> 
				  <td>Address here</td>
					<td>
						<div style={{border: "1px solid black", marginBottom:"5px"}}>
							<a href="#"><img className="card-img-top" src="http://placehold.it/700x400" alt="" 
							style={{width:"200px", marginRight:"5px"}}/></a>
							Item description here
						</div>
						<div style={{border: "1px solid black", marginBottom:"5px"}}>
							<a href="#"><img className="card-img-top" src="http://placehold.it/700x400" alt="" 
							style={{width:"200px", marginRight:"5px"}}/></a>
							Item description here
						</div>
					</td>
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

export default connect(mapStateToProps,mapDispatchToProps)(OrderHistory)
