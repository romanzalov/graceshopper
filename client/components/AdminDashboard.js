import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import history from '../history'

class AdminDashboard extends Component {
	constructor(props) {
		super(props);
	}

	// handleAddProduct = () =>{
	// 	history.push('/')
	// }

	render() {
		console.log("render 11");
		return (
			<div className="container">
			<h1 className="my-4">Admin Dashboard</h1>
				<div className="row">
				<div className="col-lg-6">
				<h3 className="my-4">Products
				<button onClick={() => history.push('/add-product')}className="btn btn-success" style={{display:"inline-block", "margin-left":"30px"}}>Add Product</button>
				<button className="btn btn-primary" style={{display:"inline-block", "margin-left":"30px"}}>View Categories</button>
				</h3>
					<table style={{width:"100%"}} className="table">
					<tbody>
					<tr>
						<th>Category</th>
						<th>Name</th>
						<th>Quantity</th>
						<th>Available</th>
						<th></th>
					</tr>
					<tr>
						<td>1</td>
						<td>2</td>
						<td>3</td>
						<td>5</td>
						<td><button className="btn btn-primary" style={{display:"inline-block"}}>View & Edit</button></td>
					</tr>
					<tr>
						<td>1</td>
						<td>2</td>
						<td>3</td>
						<td>5</td>
						<td><button className="btn btn-primary" style={{display:"inline-block"}}>View & Edit</button></td>
					</tr>
					<tr>
						<td>1</td>
						<td>2</td>
						<td>3</td>
						<td>5</td>
						<td><button className="btn btn-primary" style={{display:"inline-block"}}>View & Edit</button></td>
					</tr>
					<tr>
						<td>1</td>
						<td>2</td>
						<td>3</td>
						<td>5</td>
						<td><button className="btn btn-primary" style={{display:"inline-block"}}>View & Edit</button></td>
					</tr>
					</tbody>
					</table>
				</div>

				<div className="col-lg-6">
				<h3 className="my-4">Users</h3>
					<table style={{width:"100%"}} className="table">
					<tbody>
					<tr>
						<th>Email</th>
						<th>Name</th>
						<th>Address</th>
						<th>Orders</th>
						<th></th>
					</tr>
					<tr>
						<td>1</td>
						<td>2</td>
						<td>3</td>
						<td>5</td>
						<td><button className="btn btn-primary" style={{display:"inline-block"}}>View & Edit</button></td>
					</tr>
					<tr>
						<td>1</td>
						<td>2</td>
						<td>3</td>
						<td>5</td>
						<td><button className="btn btn-primary" style={{display:"inline-block"}}>View & Edit</button></td>
					</tr>
					<tr>
						<td>1</td>
						<td>2</td>
						<td>3</td>
						<td>5</td>
						<td><button className="btn btn-primary" style={{display:"inline-block"}}>View & Edit</button></td>
					</tr>
					<tr>
						<td>1</td>
						<td>2</td>
						<td>3</td>
						<td>5</td>
						<td><button className="btn btn-primary" style={{display:"inline-block"}}>View & Edit</button></td>
					</tr>
					</tbody>
					</table>
				</div>
				</div>
			</div>
			)
	}
}

const mapStateToProps = function(state) {

}

const mapDispatchToProps = function(dispatch) {

}

export default connect(mapStateToProps,mapDispatchToProps)(AdminDashboard)
