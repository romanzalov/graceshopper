import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import history from '../history'
import {fetchUsers} from '../store'

class AdminDashboard extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount(){
		this.props.fetchUsers();
	}

	render() {
		console.log('users', this.props.users);
		const {products, users} = this.props;

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
						<th>Availability</th>
						<th></th>
					</tr>
					{products.map(product =>{
						return (
						<tr>
							<td>{product.sportType}</td>
							<td>{product.title}</td>
							<td>{product.quantity}</td>
							<td>{product.availability}</td>
							<td><button onClick={()=>history.push(`/edit-product/${product.id}`)} className="btn btn-primary" style={{display:"inline-block"}}>View & Edit</button></td>
						</tr>
						)
					})
					}
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
					{users.map(user =>{
						return (
							<tr>
								<td>{user.email}</td>
								<td>{user.name}</td>
								<td>{user.address}</td>
								<td>{user.orders.length}</td>
								<td><button onClick={()=>history.push(`/edit-user/${user.id}`)} className="btn btn-primary" style={{display:"inline-block"}}>View & Edit</button></td>
							</tr>
						)
					})
					}
					</tbody>
					</table>
				</div>
				</div>
			</div>
			)
	}
}

const mapStateToProps = function(state) {
	console.log('state', state)
	return {
		users: state.users,
		products: state.products
	}
}

const mapDispatchToProps = function(dispatch) {
	return {
		fetchUsers: () => dispatch(fetchUsers())
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminDashboard)
